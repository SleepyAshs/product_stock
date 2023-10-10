let produtoEmEdicao = null; //variavel que procura se o produto esta para editar
        const formProduto = document.getElementById('formProduto'); //pega o elemento do forms 
        const cancelarBotao = document.getElementById('cancelar');

        function preencherFormularioEdicao(nomeproduto, quantidadeProduto) {
            document.getElementById('nome').value = nomeproduto;
            document.getElementById('quantidade').value = quantidadeProduto;
            cancelarBotao.style.display = 'inline-block';
        } //funcao para preencher o forms

        function cancelarEdicao() {
            produtoEmEdicao = null;
            formProduto.reset();
            cancelarBotao.style.display = 'none';
        }//funcao para cancelar a atualizacao do produto

        function carregarEstoque() {
            const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
            const tbody = document.getElementById('estoque');
            tbody.innerHTML = '';

            for (const produto of estoque) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>
                        <button onclick="editarProduto('${produto.nome}', ${produto.quantidade})">Editar</button>
                        <button onclick="excluirProduto('${produto.nome}')">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            }// funcao para carregar os dados inseridos no estoque utilizando o localStorage
        }

        function adicionarProduto(nome, quantidade) {
            const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
            if (produtoEmEdicao) {
                const produtoIndex = estoque.findIndex(produto => produto.nome === produtoEmEdicao);
                if (produtoIndex !== -1) {
                    estoque[produtoIndex] = { nome, quantidade };
                    produtoEmEdicao = null;
                }
            } else {
                estoque.push({ nome, quantidade });
            }
            localStorage.setItem('estoque', JSON.stringify(estoque));
            formProduto.reset();
            cancelarEdicao();
            carregarEstoque();
        }//funcao usada para adicionar produtos no estoque 

        function editarProduto(nome, quantidade) {
            produtoEmEdicao = nome;
            preencherFormularioEdicao(nome, quantidade);
        }//fubcao para editar os produtos do estoque 

        function excluirProduto(nomeproduto) {
            const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
            const novoEstoque = estoque.filter(produto => produto.nome !== nomeproduto);
            localStorage.setItem('estoque', JSON.stringify(novoEstoque));
            carregarEstoque();
        }//funcao para excvluir os produtos adicionados no estoque

        formProduto.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const quantidade = parseInt(document.getElementById('quantidade').value);
            if (nome && !isNaN(quantidade)) {
                adicionarProduto(nome, quantidade);
            }
        });

        cancelarBotao.addEventListener('click', cancelarEdicao);

        carregarEstoque();//chama os dados do produto