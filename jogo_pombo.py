#!/usr/bin/env python3
import argparse
import random
import sys

CATEGORY_ORDER = [
    "Distribuição etária",
    "Fecundidade",
    "Natalidade",
    "Mortalidade",
    "População",
    "Capacidade de suporte",
    "Regulação populacional - Defasagem temporal",
    "Regulação populacional - Fatores dependentes da densidade",
    "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
    "Interações com outras espécies - Nicho ecológico e sinantropia",
]

QUESTIONS = [
    {
        "category": "Distribuição etária",
        "scenario": "O bando precisa de mais pombos e o Bem-te-vi do bairro anda de olho no seu ninho:",
        "option_a": {"label": "Proteger o ninho e chocar ovos", "effect": "gain", "note": None},
        "option_b": {"label": "Não é preciso se preocupar, bem-te-vis e pombos convivem harmoniosamente", "effect": "loss", "note": None},
        "feedback": [
            "Pru-pru... nós pombos buscamos sempre manter uma quantidade maior de indivíduos jovens, é o que permite nosso crescimento populacional. Chamamos isso de Pirâmide Etária de Base Larga.",
            "Pru-pru... disponibilidade de alimentos, presença de predadores, condições sanitárias, tudo isso afeta a pirâmide, para o bem ou para o mal.",
            "Pru-pru... Bem-te-vis são onívoros, isso significa que possuem uma dieta variada, e nessa variedade ovos de pombos podem se tornar iguarias ocasionais. Melhor evitá-los!",
        ],
    },
    {
        "category": "Fecundidade",
        "scenario": "O inverno acabou e os dias estão ficando mais quentes e longos. O que o bando faz?",
        "option_a": {"label": "Começou o verão, hora de botar ovos", "effect": "gain", "note": None},
        "option_b": {"label": "Sou um pombo com ascendência europeia, prefiro climas frios", "effect": "loss", "note": None},
        "feedback": [
            "Pru-pru... todas as espécies possuem suas próprias taxas de fecundidade de acordo com o número de ovos ou filhotes gerados em um dado período de tempo.",
            "Pru-pru... muitos fatores estão envolvidos nessa questão: abundância de alimentos com alto teor calórico, clima quente e ameno, disponibilidade de abrigos artificiais, presença de doenças ou parasitas e outras coisinhas também...",
            "Pru-pru... pombos podem por até 4 ovos por ninhada, com duas ou mais posturas por ano. Em ambientes favoráveis, com muito alimento calórico e clima quente, somos capazes de uma taxa de fecundidade maior. Por isso somos o sucesso das cidades!",
        ],
    },
    {
        "category": "Fecundidade",
        "scenario": "Chegou a época de pôr ovos e você precisa de um novo abrigo. Voando pela cidade você descobre um abrigo alto e isolado, porém esse lugar já foi habitado antes. É possível ver restos de ninho. O que fazer?",
        "option_a": {"label": "Continue a busca, é importante achar um local limpo", "effect": "gain", "note": None},
        "option_b": {"label": "Ficar com o abrigo, já é hora desse lugar ter um novo morador", "effect": "loss", "note": "local infestado por piolhos e ácaros"},
        "feedback": [
            "Pru-pru... nem todas as espécies se reproduzem no mesmo ritmo, cada uma tem uma fecundidade própria, calculada pela quantidade de ovos ou filhotes que consegue gerar ao longo de certo intervalo de tempo.",
            "Pru-pru... a fecundidade não depende de uma coisa só: ela pode variar conforme a oferta de alimentos energéticos, a temperatura do ambiente, a existência de locais seguros para abrigo e até a presença de doenças, parasitas e outros fatores que interferem na reprodução.",
            "Pru-pru... é importante escolher abrigos bem protegidos e limpos. Saúde em primeiro lugar!",
        ],
    },
    {
        "category": "Natalidade",
        "scenario": "A escolha do abrigo é fundamental. Durante as buscas você encontrou um abrigo no alto do telhado de um galpão, bem pertinho das telhas de zinco. Predadores se manterão longe, mas o lugar parece quente. O que fazer?",
        "option_a": {"label": "Continue a busca. É importante achar um local fresco e arejado.", "effect": "gain", "note": None},
        "option_b": {"label": "Ficar com o abrigo. É importante manter os predadores fora.", "effect": "loss", "note": None},
        "feedback": [
            "Pru-pru... natalidade é o “placar de bebês” do bando: mostra quantos pombinhos nascem vivos em certo tempo.",
            "Pru-pru... esse placar sobe ou desce conforme o bando encontra comida, abrigo seguro e boas condições para os filhotes nascerem vivos. Se faltar cuidado ou aparecer doença, predador e perigo no ninho, o placar pode cair.",
            "Pru-pru... é importante escolher abrigos bem protegidos e longe dos perigos urbanos. Mantenha seu placar vitorioso!",
        ],
    },
    {
        "category": "Mortalidade",
        "scenario": "Você e seu bando avistam um “banquete lendário” no meio da rua: um saco gigante de salgadinhos aberto, bem na faixa de ônibus. A missão parece fácil — correr, beliscar e sair voando — mas os humanos estão passando apressados, os ônibus não param e um funcionário já vem tentando espantar todo mundo. O que fazer?",
        "option_a": {"label": "Esperar a área esvaziar e procurar comida em um lugar mais seguro", "effect": "gain", "note": None},
        "option_b": {"label": "Não há tempo a perder! Invadir a faixa de ônibus em busca dos salgadinhos", "effect": "loss", "note": "pombos atropelados"},
        "feedback": [
            "Pru-pru... mortalidade é como perder vidas no jogo do bando, é o número de pombos que saem da partida em certo tempo.",
            "Pru-pru... comida no papo, clima de boa e menos perigos pelo caminho ajudam o bando a perder menos vidas. Mas, se aparecem doenças, parasitas, predadores ou confusão com humanos, a mortalidade pode subir rapidinho.",
            "Pru-pru... fique longe de carros, você não vai querer ser atropelado!",
        ],
    },
    {
        "category": "População",
        "scenario": "Uma grande obra começou a dividir o parque onde seu bando vive. Uma parte do parque continua segura e cheia de pombos, enquanto a outra ficou isolada e com poucos indivíduos. O que fazer?",
        "option_a": {"label": "Mudar para a área onde existem mais pombos e continuar interagindo com o bando", "effect": "gain", "note": None},
        "option_b": {"label": "Permanecer na área isolada, longe dos outros pombos", "effect": "loss", "note": "menor interação entre os indivíduos e dificuldade para encontrar parceiros"},
        "feedback": [
            "Pru-pru... para sermos considerados uma população, não é só sermos todos pombos!",
            "Pru-pru... nós precisamos fazer parte da mesma espécie, viver em uma área específica e conseguir interagir entre si. Quanto mais pombos conseguirem permanecer próximos e interagir, mais forte será nossa população.",
            "Pru-pru... mudanças no ambiente podem separar o bando, dificultando o contato entre os indivíduos. É importante encontrar locais onde possamos continuar juntos e interagindo!",
        ],
    },
    {
        "category": "Capacidade de suporte",
        "scenario": "Foi uma primavera de muitos filhotes e o bando da praça está enorme! Só que o carrinho de pipoca e as migalhas da padaria não alimentam todo mundo. Já tem pombo magrelo brigando por cada pipoquinha e filhote piando de fome. O que fazer?",
        "option_a": {"label": "Ficar todo mundo na praça, cada um por si na hora da pipoca", "effect": "loss", "note": None},
        "option_b": {"label": "Formar pequenos grupos de exploração para descobrir novas fontes de comida pelo bairro", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... toda praça tem uma \"lotação máxima\", igual à do elevador do prédio. Chamamos isso de Capacidade de Suporte, ou simplesmente K: o número de pombos que o ambiente consegue alimentar e abrigar por muito tempo.",
            "Pru-pru... quando o bando passa do K, sobra pouca comida para cada um: os filhotes sobrevivem menos, os adultos enfraquecem e a população encolhe até voltar ao tamanho que a praça aguenta. Mas o K não é uma parede! Comida nova empurra ele para cima.",
            "Pru-pru... bando esperto não briga por migalha, descobre padaria nova!",
        ],
    },
    {
        "category": "Capacidade de suporte",
        "scenario": "Onda de calor! A fonte da praça é a única água por perto e virou festa: pombos apertados, água esverdeada e uns colegas com as penas arrepiadas e os olhos lacrimejando. O que fazer?",
        "option_a": {"label": "Dividir o bando em grupos menores e beber em poças, goteiras e bebedouros espalhados pelo bairro", "effect": "gain", "note": None},
        "option_b": {"label": "Continuar na fonte, porque é fácil e todo mundo já está lá", "effect": "loss", "note": None},
        "feedback": [
            "Pru-pru... já tentou voar contra o vento? Quanto mais forte ele sopra, menos você avança. Na ecologia, esse vento é a Resistência Ambiental: tudo o que segura o crescimento da população, como falta de comida, predadores, clima ruim e doenças.",
            "Pru-pru... e ela aperta mais quando o bando está apertado: quanto mais pombos juntos, mais fácil doenças e parasitas se espalham. Nosso potencial de crescer é enorme, mas é o cabo de guerra com a resistência do ambiente que define o K.",
            "Pru-pru... ninguém merece ser pombo doente na fonte. Espalhe-se (com moderação)!",
        ],
    },
    {
        "category": "Regulação populacional - Defasagem temporal",
        "scenario": "Faz meses que a comida do bairro está diminuindo. Na chamada da tarde, o pombo mais velho pede um voluntário para descobrir se o bando está bem. Como você vai fazer isso?",
        "option_a": {"label": "Contar os pombos adultos: se a praça continua cheia deles, está tudo bem", "effect": "loss", "note": None},
        "option_b": {"label": "Contar quantos filhotes chegam a voar a cada mês: se o número estiver caindo, o alerta acende", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... adultos são como o saldo do banco: mesmo com o salário atrasado, a conta não zera de um dia para o outro. Nós vivemos vários anos, então o bando parece o mesmo mesmo depois que o problema começou.",
            "Pru-pru... quem sente a crise primeiro são os filhotes: sem comida, nascem menos e sobrevivem menos. Contar adultos mostra o passado do bando, contar filhotes mostra o presente.",
            "Pru-pru... quer saber se o bando vai bem? Olhe para os pombinhos!",
        ],
    },
    {
        "category": "Regulação populacional - Defasagem temporal",
        "scenario": "O bando bombou nos últimos meses e tinha pombo por todo lado! Agora um casal de falcões acabou de fazer ninho na torre da igreja, bem em frente à praça. Só que a comida está diminuindo e o bando já começou a encolher. O que fazer?",
        "option_a": {"label": "Ficar tranquilo: com menos pombos no cardápio, os falcões logo vão embora", "effect": "loss", "note": None},
        "option_b": {"label": "Passar a descansar e dormir em lugares cobertos e escondidos, porque os falcões devem ficar por um tempo mesmo com menos pombos", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... os predadores também têm defasagem! Os falcões chegaram depois da fartura de pombos e vão demorar para ir embora depois que ela acabar, ainda mais com filhotes para alimentar.",
            "Pru-pru... isso pode dar um combo terrível: fome e falcão ao mesmo tempo. A população de predadores sobe e desce atrás da população de presas, sempre um passinho atrasado.",
            "Pru-pru... quando o falcão chegar, olho aberto e poleiro escondido!",
        ],
    },
    {
        "category": "Regulação populacional - Defasagem temporal",
        "scenario": "A feirinha voltou para o bairro e tem comida espalhada pela praça toda! Mas o bando continua encolhendo: nasceram poucos filhotes na época da fome e vários pombos velhinhos estão partindo. Um pombo pessimista grita: \"Essa praça está amaldiçoada, vamos embora!\" O que fazer?",
        "option_a": {"label": "Concordar e partir em busca de outra praça: se o bando ainda está encolhendo, é sinal de que aqui continua ruim", "effect": "loss", "note": None},
        "option_b": {"label": "Ficar, cuidar dos ninhos e ter paciência: a comida voltou, o bando só vai reagir daqui a um tempo", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... a defasagem funciona nos dois sentidos! A população demora para sentir a comida acabar e também demora para sentir a comida voltar. O ovo leva uns 18 dias para chocar, o filhote leva cerca de um mês para voar e uns 6 meses para ter os próprios ovos.",
            "Pru-pru... por isso o tamanho do bando hoje mostra o que aconteceu meses atrás, e não como a praça está agora.",
            "Pru-pru... nem todo problema se resolve voando para longe. Às vezes o segredo é ficar e chocar!",
        ],
    },
    {
        "category": "Regulação populacional - Defasagem temporal",
        "scenario": "A feira livre que deixava tanta comida no chão da praça acabou de mudar de bairro! Só que o bando ainda está gordinho e feliz, e tem ovos chocando nos ninhos, ou seja, logo vão aparecer bocas famintas. O que fazer?",
        "option_a": {"label": "Relaxar: o bando está ótimo e a fome ainda não chegou, dá pra resolver depois", "effect": "loss", "note": None},
        "option_b": {"label": "Começar já a procurar comida nova pelo bairro, pensando nos filhotes que estão chegando", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... a população é como um caminhão: mesmo depois de tirar o pé do acelerador, ele ainda anda um pouco. Quando a comida diminui, os ovos já postos continuam nascendo e o bando cresce mais um tempo. Chamamos isso de Defasagem Temporal: o ambiente muda hoje, mas a população só responde depois.",
            "Pru-pru... o perigo é o bando crescer justamente quando a comida está acabando, e aí a fome vem pesada.",
            "Pru-pru... quem só se preocupa quando a barriga ronca já chegou atrasado. Pense nos ovos de hoje, que são os famintos de amanhã!",
        ],
    },
    {
        "category": "Regulação populacional - Fatores dependentes da densidade",
        "scenario": "Uma padaria nova abriu no bairro vizinho e metade do bando se mudou para lá. Na praça sobraram poucos pombos, todo mundo junto e se vendo todo dia. Agora tem comida de sobra e ninho vago em cada beiral, mas alguns pombos preocupados dizem: \"Bando pequeno é bando frágil\". O que fazer?",
        "option_a": {"label": "Ficar quietinho, economizar energia e só botar ovos quando o bando voltar ao tamanho de antes", "effect": "loss", "note": None},
        "option_b": {"label": "Aproveitar a folga: com comida e ninho sobrando, é hora de caprichar nas ninhadas", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... os fatores dependentes da densidade funcionam nos dois sentidos! Quando o bando encolhe, sobra comida e ninho para cada um, a briga diminui e as doenças se espalham mais devagar. Nascem mais filhotes e mais deles sobrevivem.",
            "Pru-pru... é assim que o bando se regula sozinho: se aperta demais, o crescimento freia. Se sobra espaço, o crescimento acelera, como um elástico que sempre volta para o tamanho que a praça aguenta.",
            "Pru-pru... pouco pombo e muita comida? Bora botar ovos!",
        ],
    },
    {
        "category": "Regulação populacional - Fatores dependentes da densidade",
        "scenario": "Dois banquetes apareceram ao mesmo tempo! No calçadão, uma pilha gigante de pão de padaria, mas está uma muvuca: é pombo empurrando, bicando e brigando por cada pedacinho. Nos fundos da praça, uma pilha bem menor de milho, com só alguns pombos comendo sossegados. Para onde você vai?",
        "option_a": {"label": "Calçadão! Pilha grande é sinônimo de barriga cheia", "effect": "loss", "note": "são bicos demais dividindo a pilha, então cada pombo sai com farelinho e ainda leva bicada"},
        "option_b": {"label": "Fundos da praça: a pilha é menor, mas rende mais comida por pombo", "effect": "gain", "note": "cada pombo come bem e tem energia de sobra para ovos e filhotes"},
        "feedback": [
            "Pru-pru... quando um pombo disputa comida com outro pombo, isso se chama Competição Intraespecífica. \"Intra\" quer dizer \"dentro\": a briga acontece dentro da mesma espécie. Todo mundo ali come as mesmas coisas e quer a mesma pilha, então ninguém leva vantagem, só divide.",
            "Pru-pru... e essa briga pesa mais quando tem pombo demais junto! Quanto mais bicos na mesma pilha, menos sobra para cada um. Por isso ela é um Fator Dependente da Densidade (densidade é quantos pombos cabem num pedaço de chão). No aperto, cada pombo fica magrinho, bota menos ovos e os filhotes crescem fracos.",
            "Pru-pru... antes de mergulhar na pilha, conte os bicos!",
        ],
    },
    {
        "category": "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
        "scenario": "Chegou a hora de escolher onde fazer o ninho. Você achou um beiral baixinho, pertinho do chão e das migalhas, fácil de alcançar. Também achou uma marquise alta, com um cantinho escondido, que dá mais trabalho para chegar. O que fazer?",
        "option_a": {"label": "Beiral baixinho: comida perto e acesso fácil", "effect": "loss", "note": "gatos e ratos alcançam o ninho, e ovos e filhotes viram lanche"},
        "option_b": {"label": "Marquise alta e escondida: dá mais trabalho, mas os predadores não chegam", "effect": "gain", "note": "mais ovos viram filhotes que chegam a voar"},
        "feedback": [
            "Pru-pru... a Qualidade do Habitat é o quanto um lugar ajuda a gente a sobreviver e criar filhotes. Lugar fácil demais para nós também é fácil para os predadores!",
            "Pru-pru... perto do chão, gatos e ratos chegam ao ninho. Lá no alto e escondido, mais filhotes chegam a voar.",
            "Pru-pru... ninho seguro vale mais que ninho pertinho. Asas servem para isso!",
        ],
    },
    {
        "category": "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
        "scenario": "Você ouviu falar de dois lugares. O forro do mercado é famoso: comida farta e pombo chegando toda semana, mas os ratos atacam os ninhos e muitas ninhadas se perdem. A marquise da biblioteca não tem fama e tem comida só na medida, mas quase todos os filhotes crescem e voam. Qual escolher?",
        "option_a": {"label": "Forro do mercado: comida farta e o point do bairro", "effect": "loss", "note": "o lugar parece cheio só porque chegam pombos de fora, enquanto as ninhadas se perdem"},
        "option_b": {"label": "Marquise da biblioteca: comida na medida e filhotes seguros", "effect": "gain", "note": "nascem mais filhotes do que morrem, e sobram jovens para outros lugares"},
        "feedback": [
            "Pru-pru... nem todo lugar cheio é lugar bom! O habitat onde nascem mais pombos do que morrem é uma Fonte, e onde morrem mais do que nascem é um Sumidouro.",
            "Pru-pru... o sumidouro só parece lotado porque pombos de fora não param de chegar. A fonte manda filhotes para a cidade toda.",
            "Pru-pru... não se deixe levar pela fama: olhe quantos filhotes voam, não quantos pombos chegam!",
        ],
    },
    {
        "category": "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
        "scenario": "Vem aí uma frente fria com chuva e vento forte, bem na época dos ovos! Você está escolhendo entre um beiral estreito e aberto, com vista linda e sol da manhã, e um cantinho fundo debaixo de uma marquise larga, protegido do vento e da chuva. O que fazer?",
        "option_a": {"label": "Beiral aberto, com vista e sol da manhã", "effect": "loss", "note": "a chuva molha os ovos, o vento esfria os filhotes e a ninhada se perde"},
        "option_b": {"label": "Cantinho fundo sob a marquise larga", "effect": "gain", "note": "seco e abrigado, os ovos ficam aquecidos e os filhotes sobrevivem"},
        "feedback": [
            "Pru-pru... chuva, vento e frio pegam todo mundo igual, não importa quantos pombos tem por perto. São os Fatores Independentes da Densidade.",
            "Pru-pru... a gente não controla o tempo, mas escolhe onde ficar. Marquises e forros funcionam como guarda-chuva e amortecem o clima ruim.",
            "Pru-pru... vista bonita não choca ovo. Guarda-chuva bom, sim!",
        ],
    },
    {
        "category": "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
        "scenario": "Você achou o abrigo dos sonhos: forro seco, protegido e sem predadores! Só que ele fica num bairro de prédios de vidro e ruas limpinhas, sem uma migalha e sem água, e tudo fica bem longe. Outro lugar, um beiral apenas razoável, fica pertinho de uma padaria e de uma fonte. O que fazer?",
        "option_a": {"label": "Abrigo dos sonhos: é o melhor da cidade!", "effect": "loss", "note": "falta comida, os pais enfraquecem e os filhotes não crescem"},
        "option_b": {"label": "Beiral razoável perto de comida e água", "effect": "gain", "note": "os recursos estão juntos, os pais se alimentam e criam filhotes fortes"},
        "feedback": [
            "Pru-pru... um bom habitat precisa de vários recursos juntos: abrigo, comida e água. O que estiver mais em falta manda no jogo, e ele se chama Fator Limitante.",
            "Pru-pru... na cidade cortada em pedaços, esses recursos ficam separados, e voar de um a outro gasta energia que devia ir para os filhotes.",
            "Pru-pru... abrigo perfeito de barriga vazia não sustenta ninguém. Procure o pacote completo!",
        ],
    },
    {
        "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
        "scenario": "O outono chegou e as sementes que o bando adora estão acabando, porque as árvores da praça já soltaram tudo. No chão da calçada tem migalhas de pão, pedacinhos de fruta e até insetinhos nas frestas. Alguém do bando avisa: \"Pombo que se preze só come sementes!\" O que fazer?",
        "option_a": {"label": "Esperar a próxima temporada de sementes: pombo que se preze só come sementes", "effect": "loss", "note": None},
        "option_b": {"label": "Aceitar o cardápio da cidade: migalhas, frutinhas caídas e o que mais aparecer", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... Nicho Ecológico é o \"emprego\" de uma espécie na natureza: o que ela come, onde vive e como se vira.",
            "Pru-pru... nosso nicho é amplo: comemos de tudo um pouco, mas sementes são a nossa base. Quem só come uma coisa, o especialista, sofre quando ela acaba.",
            "Pru-pru... cardápio de um prato só é furada. Quem topa tudo nunca fica sem jantar!",
        ],
    },
    {
        "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
        "scenario": "Uma turma do bando anda cansada da vida na cidade, com tanto barulho, gente e ônibus. Ouviram falar de uma mata grande e silenciosa, bem longe, sem carros nem humanos por perto. O que fazer?",
        "option_a": {"label": "Mudar para a mata: a natureza é o lugar de verdade do pombo, sem confusão", "effect": "loss", "note": "falta comida do tipo que o bando aproveita e faltam paredões para ninho, então o bando passa aperto"},
        "option_b": {"label": "Continuar na cidade, aproveitando a comida e os abrigos que os humanos deixam por aí", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... somos sinantrópicos, ou seja, nos damos bem vivendo junto dos humanos.",
            "Pru-pru... eles deixam comida fácil e constroem prédios cheios de cantinhos para ninho, enquanto a mata fechada quase não tem paredões nem sementes no chão.",
            "Pru-pru... barulho de cidade é um preço pequeno para tanta mordomia. Cidade grande, bando feliz!",
        ],
    },
    {
        "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
        "scenario": "Você é um pombo jovem e vai escolher o lugar do primeiro ninho. No parque tem galhos finos de árvore, que balançam ao vento e é onde muito passarinho faz ninho. Num prédio antigo tem uma reentrância funda e seca numa parede bem alta. O que fazer?",
        "option_a": {"label": "Galho da árvore: passarinho faz ninho em árvore!", "effect": "loss", "note": "o galho balança, o ninho fica exposto ao vento, à chuva e aos predadores, e poucos ovos viram filhotes"},
        "option_b": {"label": "Reentrância da parede do prédio: você já viu ninho de pombo?", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... o nosso nicho, ou jeito de viver, vem de longe: nossos ancestrais faziam ninho em falésias, paredões de pedra altos e secos.",
            "Pru-pru... prédios são falésias de concreto, e por isso nos demos tão bem nas cidades. Galho fino balançando não combina com a gente.",
            "Pru-pru... prédio é penhasco com elevador. Só falta a vista para o mar!",
        ],
    },
    {
        "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
        "scenario": "O inverno chegou com noites geladas. Na praça tem galhos de árvore com vento úmido. Na parede de uma padaria, uma saída morna de ar do forno deixa um cantinho aquecido a noite toda. Alguém do bando acha esquisito dormir perto de uma máquina. O que fazer?",
        "option_a": {"label": "Dormir na árvore: parece o lugar mais natural e livre de máquinas", "effect": "loss", "note": "a noite gelada gasta muita energia do corpo, e os mais fracos não aguentam"},
        "option_b": {"label": "Dormir no cantinho morninho ao lado da saída de ar da padaria", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... a cidade é mais quentinha que o campo, por causa de prédios, asfalto e máquinas. Esse calor extra é um recurso a mais para quem vive junto dos humanos.",
            "Pru-pru... no frio, o corpo gasta muita energia só para se aquecer, então dormir no calorzinho poupa comida e ajuda a passar o inverno.",
            "Pru-pru... quem disse que forno de padaria não serve para nada? É a lareira do pombo!",
        ],
    },
    {
        "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
        "scenario": "Duas fontes de comida apareceram. Uma é uma lixeira aberta e transbordando, com restos de vários dias, comida amolecida e cheirando mal. A outra é um canteiro com sementes e migalhas de pão fresco espalhadas pelo chão. Alguém do bando lembra: \"Onívoro come de tudo, então a lixeira serve!\" O que fazer?",
        "option_a": {"label": "Lixeira: fartura à vontade, e onívoro come de tudo", "effect": "loss", "note": "a comida estragada causa doenças e a mortalidade sobe"},
        "option_b": {"label": "Canteiro: sementes e migalhas frescas", "effect": "gain", "note": None},
        "feedback": [
            "Pru-pru... somos onívoros: comemos sementes, frutinhas e até insetinhos. Ser onívoro é ter um cardápio grande, não aceitar qualquer coisa.",
            "Pru-pru... comida estragada tem fungos e bactérias que causam doenças, e doença faz a mortalidade subir. Nicho amplo também tem limites!",
            "Pru-pru... onívoro come de tudo, mas de tudo que presta. Se parece esquisito, dê meia-volta!",
        ],
    },
]

for q in QUESTIONS:
    q["tier"] = CATEGORY_ORDER.index(q["category"])

BANDS = [
    {"name": "ninho", "min_pop": 0, "K": 15, "good_mult": 1.30, "bad_mult": 0.80, "tier_center": 1.5},
    {"name": "bando", "min_pop": 20, "K": 45, "good_mult": 1.15, "bad_mult": 1.10, "tier_center": 4.0},
    {"name": "colônia", "min_pop": 60, "K": 110, "good_mult": 1.00, "bad_mult": 1.40, "tier_center": 6.5},
    {"name": "metrópole", "min_pop": 150, "K": 220, "good_mult": 0.90, "bad_mult": 1.80, "tier_center": 8.5},
]

MIN_GAP = 3

BAND_FINAL_MESSAGE = {
    "ninho": "Seu bando mal saiu do ninho, mas sobreviveu — um começo frágil e valioso.",
    "bando": "Seu bando cresceu e se firmou como uma presença de peso na praça.",
    "colônia": "Sua colônia domina os telhados do bairro inteiro!",
    "metrópole": "Seu bando virou uma verdadeira metrópole de pombos, espalhada pela cidade!",
}


def clamp(value, lo, hi):
    return max(lo, min(hi, value))


def get_band(pop):
    current = BANDS[0]
    for band in BANDS:
        if pop >= band["min_pop"]:
            current = band
    return current


def compute_wvar(pop):
    return max(1, round(pop * 0.25))


def compute_effect(pop, effect, band):
    w = compute_wvar(pop)
    density_ratio = pop / band["K"]
    if effect == "gain":
        dampening = clamp(1 - density_ratio * 0.5, 0.4, 1.0)
        delta = max(1, round(w * band["good_mult"] * dampening))
    else:
        pressure = clamp(0.5 + density_ratio * 0.7, 0.5, 2.0)
        delta = -max(1, round(w * band["bad_mult"] * pressure))
    return delta


def select_next(pool, round_idx, category_last_round, band):
    eligible = [
        i for i in pool
        if category_last_round.get(QUESTIONS[i]["category"], -999) <= round_idx - MIN_GAP
    ]
    if not eligible:
        oldest = min(category_last_round.get(QUESTIONS[i]["category"], -999) for i in pool)
        eligible = [i for i in pool if category_last_round.get(QUESTIONS[i]["category"], -999) == oldest]

    weights = [
        max(0.05, 1 - abs(QUESTIONS[i]["tier"] - band["tier_center"]) / 4)
        for i in eligible
    ]

    chosen = random.choices(eligible, weights=weights, k=1)[0]
    pool.remove(chosen)
    category_last_round[QUESTIONS[chosen]["category"]] = round_idx
    return chosen


def format_option(letter, option):
    return f"  {letter}) {option['label']}"


def play_round(pop, round_idx, q, args):
    band = get_band(pop)

    if args.debug:
        print(f"[round {round_idx} | pop={pop} | band={band['name']} | categoria={q['category']} | tier={q['tier']}]")

    print(f"\n--- Rodada {round_idx} (bando: {pop} pombos) ---")
    print(q["scenario"])
    print(format_option("a", q["option_a"]))
    print(format_option("b", q["option_b"]))

    if args.auto:
        target_effect = "gain" if args.auto == "best" else "loss"
        choice = "a" if q["option_a"]["effect"] == target_effect else "b"
    else:
        choice = ""
        while choice not in ("a", "b"):
            choice = input("Sua escolha (a/b): ").strip().lower()

    option = q["option_a"] if choice == "a" else q["option_b"]
    delta = compute_effect(pop, option["effect"], band)
    new_pop = max(0, pop + delta)

    sign = "+" if delta >= 0 else ""
    print(f"\n{option['label']}")
    if option["note"]:
        print(f"({option['note']})")
    print(f"População: {pop} -> {new_pop} ({sign}{delta})")
    for line in q["feedback"]:
        print(line)

    return new_pop


def band_message(pop):
    band = get_band(pop)
    return BAND_FINAL_MESSAGE[band["name"]]


def main():
    parser = argparse.ArgumentParser(description="Jogo do Pombo — protótipo CLI")
    parser.add_argument("--rounds", type=int, default=len(QUESTIONS), help="Número de rodadas (padrão: todas as perguntas)")
    parser.add_argument("--seed", type=int, default=None, help="Semente do gerador aleatório, para reprodutibilidade")
    parser.add_argument("--debug", action="store_true", help="Mostra info de depuração a cada rodada")
    parser.add_argument("--auto", choices=["best", "worst"], default=None, help="Modo de teste: sempre escolhe a melhor/pior opção")
    args = parser.parse_args()

    if args.seed is not None:
        random.seed(args.seed)

    rounds = min(args.rounds, len(QUESTIONS))
    pop = 5
    pool = list(range(len(QUESTIONS)))
    category_last_round = {}

    print("Pru-pru! Bem-vindo ao Jogo do Pombo.")
    print(f"Seu bando começa com {pop} pombos. Sobreviva a {rounds} rodadas de decisões.\n")

    for round_idx in range(1, rounds + 1):
        band = get_band(pop)
        q_idx = select_next(pool, round_idx, category_last_round, band)
        pop = play_round(pop, round_idx, QUESTIONS[q_idx], args)

        if pop <= 0:
            print(f"\nO bando não resistiu e desapareceu na rodada {round_idx} ({QUESTIONS[q_idx]['category']}).")
            print("Fim de jogo: derrota.")
            sys.exit(0)

    print(f"\nVocê sobreviveu a todas as {rounds} rodadas com {pop} pombos!")
    print(band_message(pop))


if __name__ == "__main__":
    main()
