:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic perc_passagem/1.
:-dynamic tFinal/1.
:-dynamic tInicial/1.
:-dynamic avaliacao/1.
:-dynamic estabil/1.
:-dynamic estabilPop/1.
:-dynamic estabilContador/1.

% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).
tarefa(t1,2,5,1).
tarefa(t2,4,7,6).
tarefa(t3,1,11,2).
tarefa(t4,3,9,3).
tarefa(t5,3,8,2).

% tarefas(NTarefas).
tarefas(5).

% parameterização
inicializa:-write('Numero de novas Geracoes: '),read(NG),
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Percentagem de passagem para a próxima geração (20% ou 30%):'), read(P3),
	PP is P3/100,

	(retract(perc_passagem(_));true), asserta(perc_passagem(PP)),
	write('Tempo absoluto:'), read(TF),
	(retract(tFinal(_));true), asserta(tLim(TF)),
	get_time(TI),
	(retract(tInicial(_));true), asserta(tInicial(TI)),


    write('Avaliação :'), read(AV),
	(retract(avaliacao(_));true), asserta(avaliacao(AV)),

		write('Numero de Geracoes ate estabilizar:'), read(ESTABILMAX),
	(retract(estabil(_));true), asserta(estabil(ESTABILMAX)).




gera:-
	inicializa,
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	 (retract(estabilContador(_));true), asserta(estabilContador(1)),
        (retract(estabilPop(_));true), asserta(estabilPop(PopOrd)),

	gera_geracao(0,NG,PopOrd).

gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa(Tarefa,_,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
	tarefa(T,Dur,Prazo,Pen),
	InstFim is Inst+Dur,
	avalia(Resto,InstFim,VResto),
	(
		(InstFim =< Prazo,!, VT is 0)
  ;
		(VT is (InstFim-Prazo)*Pen)
	),
	V is VT+VResto.

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


%Se numero de populacoes for 0
gera_geracao(G,G,_):-!.

%Se o tempo limite de execucao já passou
gera_geracao(_,_,_):-
	tFinal(TF), tInicial(TI), get_time(TA),
	Dif is TA - TI, (Dif>TF), !.

%Relacionado com a avaliacao
gera_geracao(_,_,Pop):-
	minVal(MV), getTotalAval(Pop, Av),(MV>Av), !.

%Para pop difererente
gera_geracao(N,G,Pop):-
	estabilPop(POPESTABIL),
	(Pop\==POPESTABIL), !,
	gera_nova_geracao(N,G,Pop).

%Verificacao de estabilizacao e adicao de contador
gera_geracao(_,_,Pop):-
	estabil(ESTABILMAX), estabilPop(POPESTABIL), estabilContador(CONT),
	%Adicao do contador caso a populacao seja a mesma
	(Pop==POPESTABIL), NOVOCONT = CONT + 1,
	%Remove antigo contador e colocacao do novo
	(retract(estabilContador(_));true), asserta(estabilContador(NOVOCONT)),
	%Verifica se cont ja chegou a esabilizacao definida
	(NOVOCONT>=ESTABILMAX), !.

gera_geracao(N,G,Pop):- gera_nova_geracao(N,G,Pop).

gera_nova_geracao(N,G,Pop):-
	write('Geração '), write(N), write(':'), nl, write(Pop), nl,
	%Melhoramento para cruzamento de forma aleatoria
	random_permutation(Pop,PopR),
	cruzamento(PopR,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
        %Melhoramento de juntar populacoes
        juntar_populacoes(Pop, NPopAv, Mix),
	%write('Pop Mix '), write(':'), nl, write(Mix), nl,
	ordena_populacao(Mix,NPopOrd),
	populacao(Tam), perc_passagem(Per),
	S is round(Tam * Per),
	NResto is round(Tam - S),
	nMelhores(NPopOrd, NewNPopOrd, Bestm, S),
	nRestantes(NewNPopOrd, Restos),
	ordenaNRestantes(Restos, RestosSorted, NewNPopOrd, NewNPopOrdSorted),
	nMelhores(NewNPopOrdSorted, Void, RestM, NResto),
	append(Bestm, RestM, Final),
	ordena_populacao(Final,FinalOrd),
	N1 is N+1,
	gera_geracao(N1,G,FinalOrd).



appendPops([], R, R) .
appendPops([H|T], R1, [H|R2]) :-
    appendPops(T, R1, R2).


memberPops(H, [H|_]).
memberPops(H, [_|T]) :-
    memberPops(H, T).


%predicado final
juntar_populacoes(L, [], L).
juntar_populacoes(Pop, [H| T], Mix) :-
    member(H, Pop),
    juntar_populacoes(Pop, T, Mix).

juntar_populacoes(Pop, [H| T], Mix) :-
    appendPops(Pop, [H], L1),
    juntar_populacoes(L1, T, Mix).


nMelhores(NPopOrd, NPopOrd, [], 0):- !.

nMelhores(NPopOrd, NewNPopOrd, [G|Z], Tam):- Tam1 is Tam-1, retira(1,NPopOrd,G,NN), nMelhores(NN, NewNPopOrd,Z,Tam1).

nRestantes([],[]).
nRestantes([Ind*_|Resto],[Ind*V1|Resto1]):-
	random(0.0,1.0,V1),
	nRestantes(Resto,Resto1).

ordenaNRestantes([X],[X],[Y],[Y]):-!.

ordenaNRestantes([X|Xs],Ys, [T|Ts],Us):-
		ordenaNRestantes(Xs,Zs, Ts,Ns),
		ordenaNRestantesTroca([X|Zs],Ys, [T|Ns], Us).


ordenaNRestantesTroca([X],[X],[Y],[Y]):-!.

ordenaNRestantesTroca([X*VX,Y*VY|L1],[Y*VY|L2], [T*V1T,U*V1U|M1],[U*V1U|M2]):-
	VX>VY,!,
	ordenaNRestantesTroca([X*VX|L1],L2,[T*V1T|M1],M2).

ordenaNRestantesTroca([X|L1],[X|L2], [T|M1],[T|M2]):-ordenaNRestantesTroca(L1,L2, M1,M2).


getTotalAval([], 0):-!.

getTotalAval([_*V|Resto], Av):-
    getTotalAval(Resto, Av1), Av is Av1 + V.


gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).



elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).


insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).


cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).
