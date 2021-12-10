using System;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.DriverTypes;


namespace MDV.Domain.DefineDrivers
{
    public class DefineDriver : Entity<DefineDriverId>, IAggregateRoot
    {
        public string NrMecano { get; private set; } //sequencia alfanumerica 9 caracteres

        public string Nome { get; private set; }

        public DateTime DataNascimento { get; private set; }

        public int CC { get; private set; } // cartao de cidadao

        public int NIF{ get; private set; }

        public List<DriverType> TipoTripulante { get; private set; }

        public DateTime DataEntrada { get; private set; }

        public DateTime DataSaida {get; private set; }

        public DateTime DataCartaConducao { get; private set;} // data em que obteve a licença

        public int NrCartaConducao {get ; private set; }

        private DefineDriver()
        {

        }

        private List<DriverType> TipoAlgo(List<string> listagem ){
            List<DriverType> teste= new List<DriverType>();
            foreach (var item in listagem)
            {
                DriverType paraalgo=new DriverType(item);
                teste.Add(paraalgo);
            }
            return teste;
        }
        public DefineDriver(string nrMecano, string nome, DateTime dataNascimento, int CC, int NIF, List<string> tipoTripulante, DateTime dataEntrada,
                            DateTime dataSaida, DateTime dataCartaConducao, int nrCartaConducao)
        {
           if (nrMecano.Length!=9)
            throw new BusinessRuleValidationException("O Numero mecanografico tem que ter 9 caracteres!");
            this.Id = new DefineDriverId(Guid.NewGuid());
            this.NrMecano= nrMecano;
            this.Nome=nome;
            this.DataNascimento=dataNascimento;
            this.CC=CC;
            this.NIF=NIF;
            this.TipoTripulante=TipoAlgo(tipoTripulante);
            this.DataEntrada=dataEntrada;
            this.DataSaida=dataSaida;
            this.DataCartaConducao=dataCartaConducao;
            this.NrCartaConducao=nrCartaConducao;
            
        }
    }
}
