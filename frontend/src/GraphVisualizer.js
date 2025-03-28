import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GraphVisualizer = () => {
  const svgRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeInput, setNodeInput] = useState("");
  const [edgeFrom, setEdgeFrom] = useState("");
  const [edgeTo, setEdgeTo] = useState("");

  const addNode = () => {
    if (nodeInput.trim() && !nodes.includes(nodeInput)) {
      setNodes([...nodes, nodeInput]);
      setNodeInput("");
    }
  };

  const addEdge = () => {
    if (edgeFrom && edgeTo && nodes.includes(edgeFrom) && nodes.includes(edgeTo)) {
      setEdges([...edges, { source: edgeFrom, target: edgeTo }]);
      setEdgeFrom("");
      setEdgeTo("");
    }
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 400;
    svg.attr("width", width).attr("height", height);

    const graphNodes = nodes.map((id) => ({ id }));
    const graphLinks = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }));

    const simulation = d3
      .forceSimulation(graphNodes)
      .force("link", d3.forceLink(graphLinks).id((d) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));

    const link = svg
      .selectAll(".link")
      .data(graphLinks)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "#999")
      .style("stroke-width", 2);

    const node = svg
      .selectAll(".node")
      .data(graphNodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 15)
      .style("fill", "lightblue")
      .call(
        d3.drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    const text = svg
      .selectAll(".text")
      .data(graphNodes)
      .enter()
      .append("text")
      .attr("class", "text")
      .attr("dx", 18)
      .attr("dy", 5)
      .text((d) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      text.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });
  }, [nodes, edges]); // ✅ Now it only runs when nodes/edges change

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Graph Visualizer (D3.js)</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter Node"
          value={nodeInput}
          onChange={(e) => setNodeInput(e.target.value)}
        />
        <button onClick={addNode} style={{ background: "blue", color: "white" }}>
          Add Node
        </button>
        <input
          type="text"
          placeholder="From Node"
          value={edgeFrom}
          onChange={(e) => setEdgeFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To Node"
          value={edgeTo}
          onChange={(e) => setEdgeTo(e.target.value)}
        />
        <button onClick={addEdge} style={{ background: "blue", color: "white" }}>
          Add Edge
        </button>
      </div>
      <svg ref={svgRef} style={{ border: "1px solid black", display: "block", margin: "auto" }}></svg>
    </div>
  );
};

export default GraphVisualizer;
