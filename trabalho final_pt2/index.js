//Loop
var i = 0

//pontos de atributos
var atr_points = 15


function atribuir() {
    var sair = 0
    while (sair != 1) {
        var atributos = prompt(`Você tem ${atr_points} sobrando\nDeseja aumentar o que?\n[1]-Vida: ${jogador.vida_inicial}\n[2]-Forca: ${jogador.forca}\n[3]-Agilidade: ${jogador.agl}\n[4]-Critico: ${jogador.crit}\n[5]-Defesa: ${jogador.def}\n[6]-Sair`)
        //vida
        if (atributos == 1 & atr_points > 0) {
            au_vida = Number(prompt("Deseja aumentar quantos pontos de vida? (cada ponto de atributo aumenta 5 de vida!!)"))
            if (au_vida <= atr_points) {
                atr_points = atr_points - au_vida
                jogador.vida_inicial = au_vida * 5 + jogador.vida_inicial
            }else{
                alert("Voce nao tem pontos o suficiente!")
            }
        }
        //dano
        else if (atributos == 2 & atr_points > 0) {
            au_dano = Number(prompt("Deseja aumentar quantos pontos de força?"))
            if (au_dano > atr_points) {
                alert("Voce nao tem pontos o suficiente!")
            }else{
            jogador.forca = au_dano + jogador.forca
            atr_points = atr_points - au_dano
            }
        }
        //agl
        else if (atributos == 3 & atr_points > 0) {
            au_agl = Number(prompt("Deseja aumentar quanto de agilidade?"))
            if (au_agl > atr_points) {
                alert("Voce nao tem pontos o suficiente!")
            } else {
                jogador.agl = au_agl + jogador.agl
                atr_points = atr_points - au_agl
            }
        }
        //critico
        else if (atributos == 4 & atr_points > 0) {
            au_crit = parseInt(prompt("Deseja aumentar quantos pontos de critico?\n(para cada upgrade de critico voce precisa de 5 pontos de atgributo)"))
            if (au_crit > atr_points) {
                alert("Voce nao tem pontos o suficiente!")
            } else {
                resto_pontos = au_crit % 5
                pt_atrs = (au_crit - resto_pontos) / 5
                jogador.crit = jogador.crit + pt_atrs
                atr_points = atr_points - au_crit + resto_pontos
            }
        }
        //defesa
        else if (atributos == 5 & atr_points > 0) {
            au_def = Number(prompt("Deseja aumentar quantos pontos de defesa?"))
            if (au_def > atr_points) {
                alert("Voce nao tem pontos o suficiente!")
            } else {
                jogador.def = au_def + jogador.def
                atr_points = atr_points - au_def
            }
        }
        //sair
        else if (atributos == 6) {
            sair = 1
        }
    }
}

//vitoria/sistema de recompensa
function vitoria(A){
    if(A == inimigos[1]){
        atr_points = atr_points+10
        alert(`Voce ganhou 10 pontos de atributo!`)
    }else if(A == inimigos[2]){
        atr_points = atr_points+25
        alert(`Voce ganhou 25 pontos de atributo!`)
    }else if(A == inimigos[3]){
        atr_points = atr_points+40
        alert(`Voce ganhou 40 pontos de atributo!`)
    }else{
        alert("Voce ganhou do boneco de treino... ele nao te deu nada")
    }
}


//atacar
function turno(A) {
    //ataque jogador
    ataque = jogador.forca
    critico = false
    //critico jogador
    function critico_certo() {
        ataque = ataque * 1.5
        alert("Ataque Critico!!!")
    }
    chance_crit = Math.floor(Math.random() * 11) + jogador.crit
    if (chance_crit >= 12) {
        critico = true
    }
    //ataque inimigo
    ataque_i = A.forca
    critico_i = false
    //critico inimigo
    function critico_certo_i() {
        ataque_i = ataque_i * 1.5
        alert("inimigou critou voce!!!")
    }
    chance_crit_i = Math.floor(Math.random() * 11) + A.crit
    if (chance_crit_i >= 12) {
        critico_i = true
    }

    //inimigo defende
        //defesa do brutus
        if (A == inimigos[2]) {
            if (A.vida >= 20) {
                chance_def = Math.floor(Math.random() * 11)
                if (chance_def >= 6) {
                    A.defesa = 1
                } else {
                    A.defesa = 0
                }
            }
        }
        //defesa do Ioory
        else if(A == inimigos[3]){
            chance_def = Math.floor(Math.random() * 11)
            if (chance_def >= 8 ){
                A.defesa = 1
            } else {
                A.defesa = 0
            }
        }
     //voce defende   
    if(jogador.defesa == 1){
        if (critico_i == true) {
            critico_certo_i()
        }
        dano_recebido = ataque_i-jogador.def
        jogador.vida = jogador.vida - dano_recebido
        alert(`Voce defendeu!\nDano recebido: ${dano_recebido}`)
    }
    //voce ataca primeiro
    else if (jogador.agl >= A.agl) {
        if (critico == true) {
            critico_certo()
        }
        dano_causado = ataque - A.def / 2
        A.vida = A.vida - dano_causado
        if (critico_i == true) {
            critico_certo_i()
        }
        dano_recebido = ataque_i-(jogador.def/2)
        jogador.vida = jogador.vida - dano_recebido
        alert(`Voce atacou primeiro:\nDano recebido: ${dano_recebido}  Dano causado: ${dano_causado}`)
    }
    //inimigo ataca primeiro
    else if(jogador.agl < A.agl){
        if (critico_i == true) {
            critico_certo_i()
        }
        dano_recebido = ataque_i-(jogador.def/2)
        jogador.vida = jogador.vida - dano_recebido
        if (critico == true) {
            critico_certo()
        }
        dano_causado = ataque - A.def / 2
        A.vida = A.vida - dano_causado
        alert(`${A.nome} atacou primeiro!\nDano recebido: ${dano_recebido}   Dano causado: ${dano_causado}`)
    }
    //defesa do inimigo ativa
    else if (A.defesa == 1) {
        if (critico == true) {
            critico_certo()
        }
        dano_causado = ataque - A.def
        A.vida = A.vida - dano_causado
        alert(`${A.nome} defendeu!`)
    }
    //todo mundo defendeu
    else if(jogador.defesa == 1 & A.defesa == 1){
        alert("Ninguem atacou esse round!")
    }
    jogador.defesa = 0
    A.defesa = 0
}

//luta
function lutar(A) {
    alert("Que a luta Comece!!!")
    loop = 1
    while (loop == 1) {
        esc_turno = prompt(`O que pretende fazer contra ${A.nome}?\nVida do oponente: ${A.vida}   Sua Vida: ${jogador.vida}\n[1]-Atacar\n[2]-Defender\n[3]-FUGIR!!`)
        if (esc_turno == 1) {
            turno(A)
        }else if(esc_turno == 2){
            jogador.defesa = 1
            turno(A)
        }else if(esc_turno == 3){
            alert("Voce ARREGOU!!! kkkkkkkk")
            loop = 0
        }
        //final da partida
        if(jogador.vida<=0 & A.vida<=0 & esc_turno!=3){
            if(jogador.agl>A.agl){
                alert(`Voce naucateou ${A.nome} primeiro!!!\nVoce ganhou!!!`)
                vitoria(A)
                loop = 0
            }else{
                alert(`${A.nome} te naucateou primeiro!!!\nVoce perdeu!!!`)
                loop = 0
            }
        }
        else if(jogador.vida<=0 & esc_turno!=3){
            alert("Voce perdeu!!!")
            loop = 0 
        }else if(A.vida<=0 & esc_turno!=3){
            alert("Voce ganhou!!! PARABENS!!!")
            vitoria(A)
            loop = 0
        }
    }
    

        A.vida = A.vida_inicial
    
}

//inimigos
var inimigos = [
    Dummy = {
        nome: "Dummy",
        vida_inicial: 500,
        vida: 500,
        agl: 0,
        crit: 0,
        def: 30,
        defesa: 0,
        forca: 0,
    },
    Jackson = {
        nome: "Jackson",
        vida_inicial: 50,
        vida: 50,
        forca: 25,
        agl: 20,
        crit: 2,
        def: 20,
        defesa: 0,
    }, Brutus = {
        nome: "Brutus",
        vida_inicial: 70,
        vida: 70,
        forca: 60,
        agl: 15,
        crit: 3,
        def: 50,
        defesa: 0,
    }, Ioory = {
        nome: "Ioory",
        vida_inicial: 100,
        vida: 100,
        forca: 80,
        agl: 50,
        crit: 5,
        def: 40,
        defesa: 0
    }]

//player    
var jogador = {
    nome: "",
    vida_inicial: 50,
    vida: 50,
    forca: 25,
    agl: 20,
    crit: 2,
    def: 20,
    defesa: 0
}

//
alert("LUTA POR TEXTO!!!")
jogador.nome = prompt("Insira seu nome:")

//Dev apelaun
if (jogador.nome == "Henrique") {
    jogador.vida_inicial = 500
    jogador.vida = 500
    jogador.forca = 500
    jogador.agl = 500
    jogador.crit = 10
    jogador.def = 100
}

//loop menu
while (i == 0) {
    var menu_ini = prompt(`Bem Vindo ao menu ${jogador.nome}!!! O que pretende fazer?\n[1]- Atributos\n[2]-Descancar\n[3]-Lutar\n[4]-Ajuda\n[5]-ARREGAR`)
    if (menu_ini == 1) {
        atribuir()
    } else if (menu_ini == 2) {
        alert("Recuperei minhas forças, pronto pra briga!!!")
        jogador.vida = jogador.vida_inicial
        
    } else if (menu_ini == 3) {
        var esc_op = prompt("com quem deseja lutar?\n[1]-Jackson(Fácil)\n[2]-Brutus(Médio)\n[3]-Ioory(Dificil)")
        lutar(inimigos[esc_op])
    } else if (menu_ini == 4) {
        alert(`-----------------------------\n               AJUDA\n-----------------------------\n-Atributos:\n    -Vida: Quantidade de vida que voce tem, se chegar a zero voce morre;\n    -Agilidade: define quem atacra primeiro no turno;\n    -Forca: define a quantidade de dano que voce causara no oponente;\n    -Critico: aumenta a chance de voce causar 50% a mais de dano;\n    -Defesa: durante o turno voce recebe o dano do inimigo menos metade da sua defesa,se voce defender voce recebe o dano do inimigo menos sua defesa inteira`)
        alert(`-Inimigos:\n    -Jackson: Ele tem os mesmos atributos que voce;\n    -Brutus: Muito forte porem muito lento, um alvo muito grande para poder desviar de ataques;\n    -Ioory: Grande, rapido, forte e sortudo. Se voce derrotar ele... meus parabens!`)
        alert(`-Desacansar:\n    Aqui voce reseta a sua vida e a vida dos oponentes. Descansar ne, o pai nao e de ferro!!`)
    } else if (menu_ini == 5) {
        alert("Voce arregou kkkkkkk")
        i = 1
    }
}