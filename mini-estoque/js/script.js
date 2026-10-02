// 1. Lista de produtos (array). Cada produto é um objeto.
let produtos = [
  { nome: "Mouse", categoria: "Periféricos", quantidade: 15, preco: 59.9 },
  { nome: "Teclado", categoria: "Periféricos", quantidade: 8, preco: 120 },
  { nome: "Monitor", categoria: "Telas", quantidade: 0, preco: 899 }
];

// 2. Guarda a posição do produto que está sendo editado.
// -1 significa que não estamos editando nada.
let posicaoEditando = -1;

// 3. Mostra os produtos na tabela
function mostrarProdutos() {
  let tabela = document.getElementById("lista-produtos");
  let textoPesquisa = document.getElementById("pesquisa").value.toLowerCase();

  tabela.innerHTML = ""; // limpa a tabela

  for (let i = 0; i < produtos.length; i++) {
    let produto = produtos[i];

    // Só mostra o produto se o nome contém o texto pesquisado
    if (produto.nome.toLowerCase().includes(textoPesquisa)) {
      tabela.innerHTML += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.categoria}</td>
          <td>${produto.quantidade}</td>
          <td>R$ ${Number(produto.preco).toFixed(2)}</td>
          <td>
            <button onclick="editarProduto(${i})">Editar</button>
            <button class="excluir" onclick="excluirProduto(${i})">Excluir</button>
          </td>
        </tr>
      `;
    }
  }
}

// 4. Adiciona um produto novo ou salva a edição
function salvarProduto() {
  let nome = document.getElementById("nome").value;
  let categoria = document.getElementById("categoria").value;
  let quantidade = document.getElementById("quantidade").value;
  let preco = document.getElementById("preco").value;

  // Não deixa salvar com campos vazios
  if (nome === "" || categoria === "" || quantidade === "" || preco === "") {
    alert("Preencha todos os campos!");
    return;
  }

  let produto = {
    nome: nome,
    categoria: categoria,
    quantidade: Number(quantidade),
    preco: Number(preco)
  };

  if (posicaoEditando === -1) {
    produtos.push(produto);                // adiciona no fim da lista
  } else {
    produtos[posicaoEditando] = produto;   // troca o produto antigo pelo novo
    posicaoEditando = -1;
    document.getElementById("botao-adicionar").innerText = "Adicionar";
  }

  limparFormulario();
  mostrarProdutos();
}

// 5. Coloca os dados do produto no formulário para editar
function editarProduto(posicao) {
  let produto = produtos[posicao];

  document.getElementById("nome").value = produto.nome;
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("preco").value = produto.preco;

  posicaoEditando = posicao;
  document.getElementById("botao-adicionar").innerText = "Salvar";
}

// 6. Remove um produto da lista
function excluirProduto(posicao) {
  produtos.splice(posicao, 1); // remove 1 item naquela posição
  mostrarProdutos();
}

// 7. Limpa os campos do formulário
function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("preco").value = "";
}

// 8. Mostra a tabela assim que a página abre
mostrarProdutos();
