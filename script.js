// ===== Scientific Calculator JavaScript =====

// Get display element and all buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Variable to hold current input expression
let currentInput = "";

// Loop through all buttons and add event listeners
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    // ===== Clear Button =====
    if (btn.classList.contains("clear")) {
      currentInput = "";
      display.textContent = "0";
    }

    // ===== Delete Button =====
    else if (btn.classList.contains("delete")) {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
    }

    // ===== Equals Button =====
    else if (btn.classList.contains("equals")) {
      try {
        // Replace special math symbols with JS Math functions
        let expression = currentInput
          .replace(/π/g, "Math.PI")
          .replace(/e/g, "Math.E")
          // Replace √x with Math.sqrt(x)
          .replace(/√(\d+(\.\d+)?|\([^()]*\))/g, "Math.sqrt($1)")
          // Replace sin, cos, tan, log, ln
          .replace(/sin/g, "Math.sin")
          .replace(/cos/g, "Math.cos")
          .replace(/tan/g, "Math.tan")
          .replace(/log/g, "Math.log10")
          .replace(/ln/g, "Math.log")
          // Replace powers
          .replace(/x²/g, "**2")
          .replace(/x³/g, "**3");

        // Evaluate the final expression
        currentInput = eval(expression).toString();
        display.textContent = currentInput;
      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
    }

    // ===== Other Buttons (Numbers, Operators, etc.) =====
    else {
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});
