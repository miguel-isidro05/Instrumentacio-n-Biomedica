import React, { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";
import * as d3 from "d3";

export default function ApplePlot() {
  const [rows, setRows] = useState(null);
  const [defaultRows, setDefaultRows] = useState(null);
  const [selectedLead, setSelectedLead] = useState("ECG_I");

  // Referencia al gráfico para actualizar rango sin refrescar datos
  const plotRef = useRef();

  // === CARGA INICIAL CSV DE GITHUB ===
  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/miguel-isidro05/Real_time_ECG_WebApplication/f6df084f2efac48f9d8d8c07a2bf1a460524caf2/block_001_raw.csv"
    ).then((r) => {
      setRows(r);
      setDefaultRows(r);
    });
  }, []);

  // === EVENTOS GLOBALES ===
  useEffect(() => {
    const handlerLead = (e) => {
      if (e.detail) setSelectedLead(e.detail);
    };

    const handlerRecording = (e) => {
      if (!e.detail) return;

      const parsed = Array.isArray(e.detail)
        ? e.detail
        : d3.csvParse(e.detail.content);

      const fechaBase = new Date();
      const mappedRows = parsed.map((r) => ({
        timestamp: new Date(fechaBase.getTime() + parseFloat(r.time_ecg_s) * 1000),
        ECG_I: parseFloat(r.ECG_I_filt_mV),
        ECG_II: parseFloat(r.ECG_II_filt_mV),
        ECG_III: parseFloat(r.ECG_III_filt_mV),
        AccX: parseFloat(r.accel_x_g),
        AccY: parseFloat(r.accel_y_g),
        AccZ: parseFloat(r.accel_z_g),
      }));

      setRows(mappedRows);
    };

    // 🔥 ESTE YA NO MODIFICA LOS DATOS → SOLO MUEVE EL RANGE SLIDER
    const handlerWindow = (e) => {
      if (!e.detail) return;
      const { start, end } = e.detail;

      if (plotRef.current) {
        const plot = plotRef.current.el;

        window.Plotly.relayout(plot, {
          "xaxis.range": [start * 1000, end * 1000],
        });
      }
    };

    const handlerReset = () => {
      if (defaultRows) setRows(defaultRows);
    };

    window.addEventListener("changeLead", handlerLead);
    window.addEventListener("loadRecording", handlerRecording);
    window.addEventListener("changeWindow", handlerWindow);
    window.addEventListener("resetPlot", handlerReset);

    return () => {
      window.removeEventListener("changeLead", handlerLead);
      window.removeEventListener("loadRecording", handlerRecording);
      window.removeEventListener("changeWindow", handlerWindow);
      window.removeEventListener("resetPlot", handlerReset);
    };
  }, [rows, defaultRows]);

  if (!rows || rows.length === 0) return <p></p>;

  const unpack = (data, key) => data.map((row) => row[key]);

  // === GRAFICAS ===
  const traceECG = {
    type: "scatter",
    mode: "lines",
    name: `Señal ${selectedLead}`,
    x: unpack(rows, "timestamp"),
    y: unpack(rows, selectedLead),
    line: { color: "#17BECF" },
    yaxis: "y1",
  };

  const traceAccX = {
    type: "scatter",
    mode: "lines",
    name: "IMU X",
    x: unpack(rows, "timestamp"),
    y: unpack(rows, "AccX"),
    line: { color: "#7F7F7F" },
    yaxis: "y2",
  };

  const traceAccY = {
    type: "scatter",
    mode: "lines",
    name: "IMU Y",
    x: unpack(rows, "timestamp"),
    y: unpack(rows, "AccY"),
    line: { color: "#FF5733" },
    yaxis: "y2",
  };

  const traceAccZ = {
    type: "scatter",
    mode: "lines",
    name: "IMU Z",
    x: unpack(rows, "timestamp"),
    y: unpack(rows, "AccZ"),
    line: { color: "#2ECC71" },
    yaxis: "y2",
  };

  return (
    <Plot
      ref={plotRef}
      data={[traceECG, traceAccX, traceAccY, traceAccZ]}
      layout={{
        title: `Derivación: ${selectedLead}`,
        grid: { rows: 2, columns: 1, pattern: "independent" },
        yaxis: { title: "ECG", domain: [0, 0.45] },
        yaxis2: { title: "IMU", domain: [0.45, 1] },
        xaxis: {
          type: "date",
          rangeslider: { visible: true },
        },
        xaxis2: {
          type: "date",
          matches: "x",
          rangeslider: { visible: false },
        },
        height: 600,
        margin: { t: 50, b: 50 },
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
}
