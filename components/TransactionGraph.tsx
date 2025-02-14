"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false })

interface Transaction {
  id: string
  from: string
  to: string
  value: string
  timestamp: string
}

interface GraphNode {
  id: string
  label: string
  color: string
  type: "in" | "out" | "both"
}

interface GraphData {
  nodes: GraphNode[]
  links: { source: string; target: string; value: number }[]
}

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

function shortenAddress(address: string): string {
  return `${address.slice(0, 3)}...${address.slice(-2)}`
}

// Mock function to get name for address (replace with actual implementation)
function getNameForAddress(address: string): string | null {
  const mockNames: { [key: string]: string } = {
    "0x1234567890123456789012345678901234567890": "Alice",
    "0x0987654321098765432109876543210987654321": "Bob",
    // Add more mock names as needed
  }
  return mockNames[address] || null
}

export default function TransactionGraph() {
  const searchParams = useSearchParams()
  const address = searchParams.get("address")
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (address) {
      setLoading(true)
      setError(null)
      fetch(`/api/transactions?address=${address}&offset=50`)
        .then((res) => res.json())
        .then((transactions: Transaction[]) => {
          if ("error" in transactions) {
            throw new Error(transactions.error as string)
          }
          const nodes = new Map<string, GraphNode>()
          const links: GraphData["links"] = []

          transactions.forEach((tx) => {
            if (!nodes.has(tx.from)) {
              const name = getNameForAddress(tx.from)
              nodes.set(tx.from, {
                id: tx.from,
                label: name || shortenAddress(tx.from),
                color: getRandomColor(),
                type: tx.from === address ? "out" : "in",
              })
            }
            if (!nodes.has(tx.to)) {
              const name = getNameForAddress(tx.to)
              nodes.set(tx.to, {
                id: tx.to,
                label: name || shortenAddress(tx.to),
                color: getRandomColor(),
                type: tx.to === address ? "in" : "out",
              })
            }
            links.push({
              source: tx.from,
              target: tx.to,
              value: Number.parseFloat(tx.value),
            })
          })

          setGraphData({
            nodes: Array.from(nodes.values()),
            links,
          })
        })
        .catch((err) => {
          console.error("Error fetching transaction data for graph:", err)
          setError(err.message || "Failed to fetch transaction data for graph")
        })
        .finally(() => setLoading(false))
    }
  }, [address])

  const handleNodeClick = useCallback((node: GraphNode) => {
    window.open(`https://etherscan.io/address/${node.id}`, "_blank")
  }, [])

  useEffect(() => {
    if (graphData) {
      const updatedNodes = graphData.nodes.map((node) => {
        const incomingLinks = graphData.links.filter((link) => link.target === node.id)
        const outgoingLinks = graphData.links.filter((link) => link.source === node.id)
        if (incomingLinks.length > 0 && outgoingLinks.length > 0) {
          return { ...node, type: "both" }
        }
        return node
      })

      // Only update if there's a change
      if (JSON.stringify(updatedNodes) !== JSON.stringify(graphData.nodes)) {
        setGraphData((prevData) => ({ ...prevData, nodes: updatedNodes }))
      }
    }
  }, [graphData]) // Only depend on graphData, not just links

  if (loading) {
    return (
      <Card className="h-[500px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-[500px]">
        <CardContent className="h-full flex items-center justify-center">
          <p className="text-center text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!graphData) {
    return null
  }

  return (
    <Card className="h-[540px]">
      <CardHeader>
        <CardTitle>Transaction Graph</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        <ForceGraph2D
          graphData={graphData}
          nodeLabel={(node: GraphNode) => node.id}
          nodeColor={(node: GraphNode) => node.color}
          nodeCanvasObject={(node: GraphNode, ctx, globalScale) => {
            const label = node.label
            const fontSize = 4
            ctx.font = `${fontSize}px Sans-Serif`
            ctx.fillStyle = node.color
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            // Draw node circle
            ctx.beginPath()
            ctx.arc(node.x!, node.y!, node.type === "both" ? 4 : 3, 0, 2 * Math.PI, false)
            ctx.fillStyle =
              node.type === "in"
                ? "rgba(0, 255, 0, 0.5)"
                : node.type === "out"
                  ? "rgba(255, 0, 0, 0.5)"
                  : "rgba(255, 255, 0, 0.5)"
            ctx.fill()

            // Draw label
            ctx.fillStyle = "black"
            ctx.fillText(label, node.x!, node.y!)
          }}
          nodeRelSize={6}
          linkWidth={1}
          linkColor={() => ("rgba(0,0,0,0.2)")}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={3}
          linkDirectionalParticleSpeed={0.005}
          d3VelocityDecay={0.3}
          d3AlphaDecay={0.01}
          onNodeClick={handleNodeClick}
          width={800}
          height={440}
        />
      </CardContent>
    </Card>
  )
}

