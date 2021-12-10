using System;
using MDV.Domain.DefineDrivers;
using MDV.Domain.DriverTypes;
using System.Collections.Generic;
using Xunit;

namespace MDVTestes.Domain.DefineDrivers
{

    public class DefineDriverDtoTest
    {

        public Guid Id = Guid.NewGuid();
        public string NrMecano = "Mecano";
        public string Nome = "Nome";
        public DateTime DataNascimento = new DateTime(1969,4,4);
        public int CC = 123;
        public int NIF = 123;
        public List<DriverType> TipoTripulante = new List<DriverType>();
        public DateTime DataEntrada = new DateTime(1999,4,4);
        public DateTime DataSaida = new DateTime(2009,4,4);
        public DateTime DataCartaConducao = new DateTime(2019,4,4);
        public int NrCartaConducao = 123;

        [Fact]
        public void DefineDriverDtoConstructor()
        {
            var defineDriverDTO = new DefineDriverDTO(this.Id, this.NrMecano,this.Nome, this.DataNascimento, this.CC, this.NIF,
            this.TipoTripulante, this.DataEntrada, this.DataSaida, this.DataCartaConducao, this.NrCartaConducao);
            Assert.NotNull(defineDriverDTO);
            Assert.Equal(defineDriverDTO.Id, this.Id);
            Assert.Equal(defineDriverDTO.NrMecano, this.NrMecano);
            Assert.Equal(defineDriverDTO.Nome, this.Nome);
            Assert.Equal(defineDriverDTO.DataNascimento, this.DataNascimento);
            Assert.Equal(defineDriverDTO.CC, this.CC);
            Assert.Equal(defineDriverDTO.NIF, this.NIF);
            Assert.Equal(defineDriverDTO.TipoTripulante, this.TipoTripulante);
            Assert.Equal(defineDriverDTO.DataEntrada, this.DataEntrada);
            Assert.Equal(defineDriverDTO.DataSaida, this.DataSaida);
            Assert.Equal(defineDriverDTO.DataCartaConducao, this.DataCartaConducao);
            Assert.Equal(defineDriverDTO.NrCartaConducao, this.NrCartaConducao);
        }
    }
}
