const submitButton = document.getElementById("submitButton");
submitButton.setAttributeNode(document.createAttribute("disabled"));
const input = document.getElementById("formFile");
const formData = new FormData();
const table = document.getElementById("table");

window.addEventListener("load", async () => {
  const imports = await getImports();
  table.innerHTML = tableHTML(imports);
});

input.addEventListener("change", (changes) => {
  const file = changes.target.files[0];
  disableSubmitButton(file);
  formData.append("file", file);
});

submitButton.addEventListener("click", async () => {
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
  return fetch("http://localhost:3000/transactions", {
    method: "POST",
    body: formData,
  });
}

async function getImports() {
  return fetch("http://localhost:3000/imports", {
    method: "GET",
  }).then((data) => data.json());
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

const tableHTML = (imports) => `
    <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Transaction Date</th>
        <th scope="col">Import Date</th>
        <th scope="col">Imported Transactions</th>
      </tr>
    </thead>
    <tbody>
        ${imports.map(
          (importData) => `
         <tr>
          <th scope="row">${importData.id} </th>
          <td>${importData.transactions_date}</td>
          <td>${importData.import_date}</td>
          <td>${importData.transactions_imported}</td>
        </tr>`
        )}
  </tbody>
</table>
  `;
