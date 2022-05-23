const submitButton = document.getElementById("submitButton");

const input = document.getElementById("formFile");

submitButton.setAttributeNode(document.createAttribute("disabled"));

const formData = new FormData();

input.addEventListener("change", (changes) => {
  const file = changes.target.files[0];
  disableSubmitButton(file);
  formData.append("file", changes.target.files[0]);
});

submitButton.addEventListener("click", async () => {
  console.log(formData.get("file"));
  await uploadFile(formData);
});

function disableSubmitButton(file) {
  if (!file) {
    submitButton.setAttributeNode(document.createAttribute("disabled"));
    return;
  }

  const validateFileType = validateAcceptedTypes(file);

  if (!validateFileType) {
    submitButton.setAttributeNode(document.createAttribute("disabled"));
    return;
  }

  submitButton.removeAttribute("disabled");
}

async function uploadFile(formData) {
  await fetch("/upload/image", { method: "POST", body: formData });
}

function validateAcceptedTypes(file) {
  const acceptFileTypes = ["text/csv"];

  const fileIsAccepted = acceptFileTypes.includes(file.type);

  if (!fileIsAccepted) {
    alert("File must be a CSV file");
    return false;
  }

  return true;
}
