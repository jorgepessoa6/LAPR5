using MDV.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System;
using Moq;
using MDV.Domain.DefineDrivers;
using Xunit;

namespace MDVTestes.MDVTests.Domain.DefineDriversTrabalho
{

    public class DefineDriverServiceTest
    {


        public Guid Id = Guid.NewGuid();
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


        [Fact]
        public void DefineDriverServiceConstrutor()
        {

            var mockBlocoRepo = new Mock<IDefineDriverRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DefineDriverService(mockUnitRepo.Object, mockBlocoRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var defineDriver1 =  new DefineDriver(this.NrMecano,this.Nome, this.DataNascimento, this.CC, this.NIF,
            this.TipoTripulante, this.DataEntrada, this.DataSaida, this.DataCartaConducao, this.NrCartaConducao);

            var defineDriver2 = new DefineDriverMapper(this.NrMecano,this.Nome, this.DataNascimento, this.CC, this.NIF,
            this.TipoTripulante, this.DataEntrada, this.DataSaida, this.DataCartaConducao, this.NrCartaConducao);

            var mockRepo = new Mock<IDefineDriverRepository>();
            mockRepo.Setup(repo => repo.AddAsync(defineDriver1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new DefineDriverService(mockUnitRepo.Object, mockRepo.Object);

            var defineDriver = await service.AddAsync(defineDriver2);

            Assert.Equal(defineDriver.NrMecano, defineDriver2.NrMecano);

        }
    }
}