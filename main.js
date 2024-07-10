document.addEventListener("DOMContentLoaded", () => {
    // Captura de elementos del DOM
    const inputTextArea = document.getElementById("input-text");
    const outputMessage = document.getElementById("output-message");
    const outputDescription = document.getElementById("output-description");
    const encryptBtn = document.getElementById("encrypt-btn");
    const decryptBtn = document.getElementById("decrypt-btn");
    const imagenNo = document.getElementById("img-text-not");
    const copyBtn = document.getElementById("btn-copiar");
  
    // Función para mostrar alertas
    const showAlert = (title, text, icon, confirmButtonText) => {
      Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        confirmButtonColor: "#0a3871",
        timer: 1500,
      });
    };
  
    // Función para validar que el texto contiene solo letras minúsculas sin acentos
    const validateText = (text) => {
      const regex = /^[a-z\s]*$/;
      return regex.test(text);
    };
  
    // Función para encriptar texto
    const encryptText = () => {
      const inputText = inputTextArea.value;
      if (inputText === "") {
        showAlert(
          "Error!",
          "Agregue un texto para encriptar",
          "error",
          "Continuar"
        );
        return;
      }
      if (!validateText(inputText)) {
        showAlert(
          "Error!",
          "Solo se permiten letras minúsculas y sin acentos",
          "error",
          "Continuar"
        );
        return;
      }
      const encryptedText = inputText
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
  
      imagenNo.style.display = "none";
      copyBtn.style.display = "block";
      inputTextArea.value = "";
      outputMessage.textContent = encryptedText;
      outputDescription.textContent = "Texto encriptado.";
    };
  
    // Función para desencriptar texto
    const decryptText = () => {
      const inputText = inputTextArea.value;
      if (inputText === "") {
        showAlert(
          "Error!",
          "Agregue un texto para desencriptar",
          "error",
          "Continuar"
        );
        return;
      }
      const decryptedText = inputText
        .replace(/ufat/g, "u")
        .replace(/ober/g, "o")
        .replace(/ai/g, "a")
        .replace(/imes/g, "i")
        .replace(/enter/g, "e");
  
      outputMessage.textContent = decryptedText;
      outputDescription.textContent = "Texto desencriptado.";
    };
  
    // Función para copiar texto al portapapeles y resaltarlo
    const copyToClipboard = () => {
      const range = document.createRange();
      range.selectNodeContents(outputMessage);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
  
      try {
        navigator.clipboard.writeText(outputMessage.textContent).then(() => {
          showAlert(
            "Copiado!",
            "Texto copiado al portapapeles",
            "success",
            "Continuar"
          );
          setTimeout(() => {
            selection.removeAllRanges();
            copyBtn.style.display = "none";
            imagenNo.style.display = "block";
            outputDescription.textContent = "Texto copiado.";
          }, 1500); // Elimina la selección después de 1.5 segundos
        });
      } catch (err) {
        showAlert("Error!", "No se pudo copiar el texto", "error", "Continuar");
      }
    };
  
    // Añadir eventos a los botones
    encryptBtn.addEventListener("click", encryptText);
    decryptBtn.addEventListener("click", decryptText);
    copyBtn.addEventListener("click", copyToClipboard);
  });
  