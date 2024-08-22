"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [equation, setEquation] = useState("Zn+HCl=ZnCl2+H2");
  const [result, setResult] = useState("");

  useEffect(() => {
    function balanceEquation(equation) {
      const [leftSide, rightSide] = equation.split("="); // Zn+HCl ZnCl2+H2

      const leftCompounds = leftSide.split("+").map((c) => c.trim()); // Zn, HCl
      const rightCompounds = rightSide.split("+").map((c) => c.trim()); // ZnCl2, H2

      const allCompounds = [...leftCompounds, ...rightCompounds]; // Zn, HCl, ZnCl2, H2

      // Extract unique elements
      const elementRegex = /([A-Z][a-z]?)(\d*)/g;
      const elements = new Set();
      allCompounds.forEach((compound) => {
        let match;
        while ((match = elementRegex.exec(compound)) !== null) {
          elements.add(match[1]);
        }
      }); // Zn, H, Cl

      const elementList = Array.from(elements); // Zn, H, Cl

      // Build the matrix
      const matrix = elementList.map((element) => {
        const row = allCompounds.map((compound) => {
          let match;
          const compoundElements = {};
          while ((match = elementRegex.exec(compound)) !== null) {
            const elementSymbol = match[1];
            const count = parseInt(match[2] || "1", 10);
            compoundElements[elementSymbol] = count;
          }
          return compoundElements[element] || 0;
        });
        return row;
      });
      console.log("matrix", matrix);

      const leftMatrix = matrix.map((row) =>
        row.slice(0, leftCompounds.length)
      );
      console.log(leftMatrix);
      const rightMatrix = matrix.map((row) =>
        row.slice(leftCompounds.length).map((v) => -v)
      );
      console.log(rightMatrix);

      const finalMatrix = leftMatrix.map((row, i) =>
        row.concat(rightMatrix[i])
      );
      console.log(finalMatrix);

      // Solve the matrix using Gaussian elimination or some other method
      const coefficients = solveMatrix(finalMatrix); // -0, 0, -0, 1
      console.log(coefficients);

      // Normalize coefficients
      const lcm = (a, b) => (!b ? a : lcm(b, a % b));
      const normalizeFactor = coefficients.reduce((a, b) => lcm(a, b)); // 1

      const normalizedCoefficients = coefficients.map(
        (coeff) => coeff / normalizeFactor
      ); // -0, 0, -0, 1

      // Construct the balanced equation
      const balancedLeftSide = leftCompounds
        .map((compound, i) =>
          normalizedCoefficients[i] !== 1 && normalizedCoefficients[i] !== 0
            ? normalizedCoefficients[i] + compound
            : compound
        )
        .join("+");

      const balancedRightSide = rightCompounds
        .map((compound, i) =>
          normalizedCoefficients[i + leftCompounds.length] !== 1 &&
          normalizedCoefficients[i + leftCompounds.length] !== 0
            ? normalizedCoefficients[i + leftCompounds.length] + compound
            : compound
        )
        .join("+");

      return `${balancedLeftSide} = ${balancedRightSide}`;
    }

    // Function to solve the matrix (Gaussian elimination)
    function solveMatrix(matrix) {
      const rows = matrix.length; // 3
      const cols = matrix[0].length; // 4
      const coefficients = Array(cols).fill(1); // Initial coefficients set to 1

      for (let i = 0; i < rows; i++) {
        let pivot = matrix[i][i];
        for (let j = i + 1; j < rows; j++) {
          const factor = matrix[j][i] / pivot;
          for (let k = 0; k < cols; k++) {
            matrix[j][k] -= factor * matrix[i][k];
          }
        }
      }

      // Back substitution
      for (let i = rows - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < cols; j++) {
          sum += matrix[i][j] * coefficients[j];
        }
        coefficients[i] = (matrix[i][cols - 1] - sum) / matrix[i][i];
      }

      return coefficients;
    }

    setResult(balanceEquation(equation));
  }, [equation]);

  return (
    <div className="flex flex-col items-center text-center py-10 space-y-10">
      <h1 className="text-2xl">Chemical equation balancer</h1>

      <div>
        <h2 className="text-xl">Write here your chemical reaction</h2>
        <h3 className="text-lg mb-2">Correct format (case sensitive!):</h3>
        <p>Zn + HCl = ZnCl2 + H2</p>
        <p>Zn+HCl=ZnCl2+H2</p>
      </div>

      <div>
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        />
        <p>IS EQUAL</p>
        <input type="text" value={result} readOnly />
      </div>
    </div>
  );
}
