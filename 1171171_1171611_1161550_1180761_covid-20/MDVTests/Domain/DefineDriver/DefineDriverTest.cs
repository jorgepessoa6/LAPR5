using System;
using Xunit;
using MDV.Domain.DefineDrivers;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.Trips;
using MDV.Domain.DriverTypes;

namespace test.Domain.WorkBock
{
    public class DefineDriverTest
    {

        public string NrMecano = "123456789";
        public string Nome = "Nome";
        public DateTime DataNascimento = new DateTime(1969,4,4);
        public int CC = 123;
        public int NIF = 123;
        public List<string> TipoTripulante = new List<string>();
        public DateTime DataEntrada = new DateTime(1999,4,4);
        public DateTime DataSaida = new DateTime(2009,4,4);
        public DateTime DataCartaConducao = new DateTime(2019,4,4);
        public int NrCartaConducao = 123;

        /* private Trip viagem = new Trip("Trip:1", true, Direction.Go, "Line:1", true, ); */

        [Fact]
        public void criarDefineDriverSuccess()
        {

            DefineDriver user = new DefineDriver(this.NrMecano,this.Nome, this.DataNascimento, this.CC, this.NIF,
            this.TipoTripulante, this.DataEntrada, this.DataSaida, this.DataCartaConducao, this.NrCartaConducao);
            Assert.NotNull(user);
        }

    }
}