//using MDV.Domain.WorkBlock;
using System;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.DriverTypes;

namespace MDV.Domain.DefineDrivers
{
    public class DefineDriverMapper
    {
        public string NrMecano { get; private set; } //sequencia alfanumerica 9 caracteres

        public string Nome { get; private set; }

        public DateTime DataNascimento { get; private set; }

        public int CC { get; private set; } // cartao de cidadao

        public int NIF{ get; private set; }

        public List<string> TipoTripulante { get; private set; }

        public DateTime DataEntrada { get; private set; }

        public DateTime DataSaida {get; private set; }

        public DateTime DataCartaConducao { get; private set;} // data em que obteve a licença

        public int NrCartaConducao {get ; private set; }



        public DefineDriverMapper(string nrMecano, string nome, DateTime dataNascimento, int CC, int NIF, List<string> TipoTripulante,
                                    DateTime dataEntrada, DateTime dataSaida, DateTime dataCartaConducao, int nrCartaConducao)
        {
           this.NrMecano= nrMecano;
        
            this.Nome=nome;
            this.DataNascimento=dataNascimento;
            this.CC=CC;
            this.NIF=NIF;
            this.TipoTripulante=TipoTripulante;
            this.DataEntrada=dataEntrada;
            this.DataSaida=dataSaida;
            this.DataCartaConducao=dataCartaConducao;
            this.NrCartaConducao=nrCartaConducao;
        }
    }
}