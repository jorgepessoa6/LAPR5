% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).

:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_open)).


getValues():-
       retractall(no(_,_,_,_,_,_)),
       http_open('http://localhost:3000/api/node/listarNome',AllNodes,
                 []
                ),
       json_read_dict(AllNodes, Data),
       createNodes(Data).

createNodes([]):-!.
%Mudar os f para false
%
:-dynamic no/6.
createNodes([FirstNode|OtherNodes]):-
        createNodes(OtherNodes),
        assertz(no(FirstNode.name,FirstNode.shortName,FirstNode.isDepot,FirstNode.isReliefPoint,FirstNode.latitude,FirstNode.longitude)).




linha("Paredes_Aguiar", 1, ["AGUIA","RECAR", "PARAD", "CETE", "PARED"], 31, 15700).
linha("Paredes_Aguiar", 3, ["PARED", "CETE","PARAD", "RECAR", "AGUIA"], 31, 15700).
linha("Paredes_Gandra", 5 , ["GAND", "VANDO", "BALTR", "MOURZ", "PARED"], 26, 13000).
linha("Paredes_Gandra", 8, ["PARED", "MOURZ", "BALTR", "VANDO", "GAND"], 26, 13000).
linha("Paredes_Lordelo", 9, ["LORDL","VANDO", "BALTR", "MOURZ", "PARED"], 29, 14300).
linha("Paredes_Lordelo", 11, ["PARED","MOURZ", "BALTR", "VANDO", "LORDL"], 29, 14300).
linha("Lordelo_Parada", 24, ["LORDL", "DIGRJ", "CRIST", "VCCAR", "BALTR", "PARAD"], 22, 11000).
linha("Lordelo_Parada", 26, ["PARAD", "BALTR", "VCCAR", "CRIST", "DIGRJ", "LORDL"], 22, 11000).
% linha("Cristelo_Baltar", nd0, ["CRIST", "VCCAR", "BALTR"], 8, 4000).
% linha("Baltar_Cristelo", nd1, ["BALTR", "VCCAR", "CRIST"], 8, 4000).
linha("Sobrosa_Cete", 22, ["SOBRO", "CRIST", "BESTR", "VCCAR", "MOURZ", "CETE"], 23, 11500).
linha("Sobrosa_Cete", 20, ["CETE", "MOURZ", "VCCAR", "BESTR", "CRIST", "SOBRO"], 23, 11500).
linha("Esta��o(Lordelo)_Lordelo",34,["ESTLO","LORDL"], 2,1500).
linha("Lordelo_Esta��o(Lordelo)",35,["LORDL","ESTLO"], 2,1500).
linha("Esta��o(Lordelo)_Sobrosa",36,["ESTLO","SOBRO"], 5,1500).
linha("Sobrosa_Esta��o(Lordelo)",37,["SOBRO","ESTLO"], 5,1800).
linha("Esta��o(Paredes)_Paredes",38,["ESTPA","PARED"], 2,1500).
linha("Paredes_Esta��o(Paredes)",39,["PARED","ESTPA"], 2,1500).

horario(1,[36000,36540,36840,37140,37620]).
horario(1,[37800,38340,38640,38940,39420]).
horario(1,[39600,40140,40440,40740,41220]).

horario(3,[73800,74280,74580,74880,75420]).
horario(3,[72900,73380,73680,73980,74520]).
horario(3,[72000,72480,72780,73080,73620]).

horario(5,[30360,30960,31200,31440,31920]).
horario(5,[33960,34560,34800,35040,35520]).
horario(5,[37560,38160,38400,38640,39120]).

horario(8,[28860,29340,29580,29820,30360]).
horario(8,[32400,32880,33120,33360,33960]).
horario(8,[36000,36480,36720,36960,37560]).

horario(9,[29160,29940,30180,30420,30900]).
horario(9,[30060,30840,31080,31320,31800]).
horario(9,[30960,31740,31980,32220,32700]).

horario(11,[27420,27900,28140,28380,29160]).
horario(11,[28320,28800,29040,29280,30060]).
horario(11,[29220,29700,29940,30180,30960]).

horario(20,[30180,30480,30720,30960,31320,31560]).
horario(20,[31380,31680,31920,32160,32520,32760]).
horario(20,[32580,32880,33120,33360,33720,33960]).

horario(22,[34800,35040,35400,35640,35880,36180]).
horario(22,[33600,33840,34200,34440,34680,34980]).
horario(22,[32400,32640,33000,33240,33480,33780]).

horario(24,[26700,27000,27240,27480,27720,28020]).
horario(24,[72900,73200,73440,73680,73920,74420]).
horario(24,[71580,71880,72120,72360,72600,72900]).

horario(26,[33600,33900,34140,34380,34620,34920]).
horario(26,[32280,32580,32820,33060,33300,33600]).
horario(26,[30960,31260,31500,31740,31980,32280]).


:-dynamic liga/3.
% Algo de gerar liga��o da TP
gera_ligacoes:- retractall(liga(_,_,_)),
			findall(_,((no(_,No1,true,false,_,_);no(_,No1,false,true,_,_)),(no(_,No2,true,false,_,_);no(_,No2,false,true,_,_)),
			No1\==No2, linha(_,N,LNos,_,_),
			ordem_membros(No1,No2,LNos),
			assertz(liga(No1,No2,N))),_).

ordem_membros(No1,No2,[No1|L]):- member(No2,L),!.
ordem_membros(No1,No2,[_|L]):- ordem_membros(No1,No2,L).

/*
implementa��o de gerador de todas as solu��es para mudan�a de motorista/tripula��o
 entre esta��es de rendi��o e escolha da solu��o que minimiza tempo total de mudan�a.
*/


caminho(Noi,Nof,LCaminho):-
	caminho(Noi,Nof,[],LCaminho).
	caminho(No,No,Lusadas,Lfinal):-reverse(Lusadas,Lfinal).
	caminho(No1,Nof,Lusadas,Lfinal):-
	liga(No1,No2,N),
	\+member((_,_,N),Lusadas),
	\+member((No2,_,_),Lusadas),
	\+member((_,No2,_),Lusadas),
	caminho(No2,Nof,[(No1,No2,N)|Lusadas],Lfinal).
/*
	Sem findall
*/



:-dynamic melhor_sol_ntempo/2.
procura_melhor_caminho(TempoPartida,Orig,Dest,LCaminho_menostempo, H):-
        gera_ligacoes(),
	get_time(Ti),
	(melhor_caminho(TempoPartida,Orig,Dest);true),
	retract(melhor_sol_ntempo(LCaminho_menostempo,H)),
	get_time(Tf),
	TSol is Tf-Ti,
	write('Tempo de geracao da solucao:'),write(TSol),nl,
        write(LCaminho_menostempo).

       % append_lista(LCaminho_menostempo,Lf),
        %append(LCaminho_menostempo,PUTA),
        % write(Lf).
        %write(Lf).
        %atom_string(LCaminho_menostempo,Cam),
        %postResults(TempoPartida,Orig,Dest,Lf,H).



melhor_caminho(T,Noi,Nof):-
	asserta(melhor_sol_ntempo(_,1000000)),
	caminho(Noi,Nof,LCaminho),
	atualiza_melhor(T,LCaminho),
	fail.

atualiza_melhor(T,LCaminho):-
	melhor_sol_ntempo(_,N),
	caminho_lig(T,LCaminho,C),
	C<N,retract(melhor_sol_ntempo(_,_)),
	asserta(melhor_sol_ntempo(LCaminho,C)).

caminho_lig(Tempo,[],Tempo):- !.

caminho_lig(Tempo,[(Noi,Nof,NLinha)|T], C):-
	horario_seguinte(NLinha,Noi,TempoInicial),
	horario_seguinte(NLinha,Nof,Cp),
	TempoInicial >= Tempo,
	Cp > TempoInicial,
	caminho_lig(Cp,T,C).

horario_seguinte(NLinha,No,H):-
	linha(_,NLinha,Per,_,_),
	nth1(Pos,Per,No),
	horario(NLinha,Horarios),
	nth1(Pos,Horarios,H),!.

% Inicio Algoritmo ASTAR
aStarOPT(Time,O,D,Path,Weight):-
    % Cria ligacoes
    gera_ligacoes(),
	% Calcula Maior Velocidade Média
	calcularMaiorVelocidade(MaiorVelo),

	%Chama AStar
    aStar2OPT(1,D,[(_,Time,Time,[O])],Path,Weight,MaiorVelo),
    write('aqui'),
	postResults(Time,O,D,Path,Weight).

calcularMaiorVelocidade(Velo):-
	%Para todas as linhas calcular as velocidades medias
    findall(Velo,
            (linha(_,_,_,Tempo,Dist),calculoAuxiliar(Dist,Tempo,Velo)
                )
           ,Result),
    %Ordenar por velocidade media
    sort(Result,ListaTemp),
	%Buscar maior a partir do last
    last(ListaTemp,Velo).

calculoAuxiliar(Dist,Tempo,VelAtual):-
	%tempo em segundos
    Temp is Tempo*60,
    %Velocidade do autocarro na linha
    VelAtual is Dist/Temp.

aStar2OPT(_, Dest,[(_,Custo,_,[Dest|T])|_],Cam,Custo,_):-
    %Ordenar lista quando se chega ao destino
	reverse([Dest|T],Cam),!.


aStar2OPT(Velo,Dest,[(_,Ca,Time,LA)|Outros],Cam,Custo,MaiorVelo):-
       LA=[Act|_],
       findall((CEX,CaX,NovoTempo,[X|LA]),
				%Dest tem de ser diferente de Act e vai buscar todos nos e linhas com ligacao
			(Dest\==Act,liga(Act,X,NLinha),
				%Verifica se ja nao faz parte da lista
		        \+ member(X,LA),
				%calculo do custo associado
		        calculoTempo(Time,Act,X,NLinha,CustoX,NovoTempo),
				CaX is CustoX + Ca,
                                       %                  write(CaX),nl,

				%estimativa calculada com Maior Velocidade Media
		        estimativaOPT(X,Dest, MaiorVelo, EstX),
				CEX is CaX +EstX),
	       Novos),
		   %Append dos novos resultados aos anteriores
	       append(Outros,Novos,Todos),
	       sort(Todos,TodosOrd),
	       aStar2OPT(Velo, Dest,TodosOrd,Cam,Custo,MaiorVelo).


% Calculo da estimativa
estimativaOPT(NodeOrig,NodeDest,Velocity,Estimate):-
    %chama predicado de calculo de distancia
    distanceNodes(NodeOrig,NodeDest,Distance),
    Estimate is Distance/Velocity.



calculoTempo(Time,Act,Next,NLinha,CustoX, NovoTempo):-
    %ordena os horarios pelo formato sugerido pelo professor
	sortHorarios(NLinha,NewList),
	    %buscar nos da linha
        linha(_,NLinha,LL,_,_),
        %write(NLinha),
	nth1(Pos,LL,Act),nth1(PosFinal,LL,Next),
	%calculo do custo com todas as variaveis
	calculoCusto(NewList, Time, Pos, PosFinal, CustoX, NovoTempo).

sortHorarios(NLinha,ListaOrdenada):-
    findall(List, horario(NLinha, List), NewListTemp),
    sort(NewListTemp, ListaOrdenada).

calculoCusto([X|[]], Time, _, PosFinal, CustoX, TempoNovo):-
   %uma vez que a lista esteja so com um elemento
	nth1(PosFinal,X,ElFinal),
        ElFinal>Time,!,
        CustoX is ElFinal - Time, TempoNovo is ElFinal.
      %  write(TempoNovo),nl.

calculoCusto([X|Y], Time, Pos, PosFinal, CustoX, TempoNovo):-
	nth1(Pos,X,Elemento),
	%Caso já tenha passado o tempo para um dado horario dou skip, caso nao, continua
%	write(Elemento),nl,
 %       write(Time),nl,
        Elemento<Time,!,calculoCusto(Y, Time, Pos, PosFinal, CustoX, TempoNovo).

calculoCusto([X|Y], Time, Pos, PosFinal, CustoX, TempoNovo):-
	calculoCusto(Y, Time, Pos, PosFinal, CustoX1, _),
	nth1(PosFinal,X,ElFinal),Contador is ElFinal - Time, Contador<CustoX1, CustoX is Contador,
	%definicao do novo tempo
	TempoNovo is ElFinal.

calculoCusto([_|Y], Time, Pos, PosFinal, CustoX, TempoNovo):-
	calculoCusto(Y, Time, Pos, PosFinal, CustoX, TempoNovo).



% Calculo distancia entre nós tendo em conta a esfericidade da terra + lat e lon
distanceNodes(InitialNode,FinalNode,Distance):-
	no(_,InitialNode,_,_,LatInitial,LongInitial), no(_,FinalNode,_,_,LatFinal,LongFinal),
        LatInitialTemp is LatInitial*pi/180, LongInitialTemp is LongInitial*pi/180,
        LatFinalTemp is LatFinal*pi/180,LongFinalTemp is LongFinal*pi/180,
        Distance is 6378.137*acos((cos(LatInitialTemp) * cos(LatFinalTemp) *cos(LongFinalTemp-LongInitialTemp))
                                  + (sin(LatInitialTemp)* sin(LatFinalTemp)))*1000.



%post da solucao
postResults(TempoPartida,NodeInicial,NodeFinal,Caminho,Custo):-
	write(Caminho),
       Term= json([
                time= TempoPartida,
                noI=NodeInicial,
		noF= NodeFinal,
		caminho= Caminho,
		finalTime= Custo]),
   http_post('http://localhost:3000/api/results/post',json(Term),_,[]).


calcular_tempo(Act,X,Linha, HoraInicial, HoraParagem):-
    horario_seguinte(Linha,Act,HoraI),
    horario_seguinte(Linha,X,HoraParagem),
    HoraI>=HoraInicial,
    HoraI=<HoraParagem.


bfs(Origem,Destino,Caminho,HoraInicio, HoraFim):-
    gera_ligacoes(),
    bfsAux(Destino,(HoraInicio,[Origem]),Caminho,HoraFim).

bfsAux(Destino,(Hora,[Destino|T]),Caminho,Hora):- !,
    reverse([Destino|T],Caminho).

bfsAux(Destino,(HoraInicio,LA),Caminho,HoraFim):-
    LA = [Act|_],
    findall((EstX,CaX,[X|LA]),
    (liga(Act,X,CX), \+ member(X,LA), distanceNodes(X,Destino,EstX),
    calcular_tempo(Act,X,CX, HoraInicio, HoraParagem),
    CaX is HoraParagem),Novos),
    sort(Novos,NovosOrd),
    NovosOrd = [(_,CM,Melhor)|_],
    bfsAux(Destino,(CM,Melhor),Caminho,HoraFim).
