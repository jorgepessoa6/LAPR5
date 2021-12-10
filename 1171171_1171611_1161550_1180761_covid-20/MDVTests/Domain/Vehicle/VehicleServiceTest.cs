using MDV.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System;
using Moq;
using MDV.Domain.Vehicles;
using Xunit;

namespace MDVTestes.MDVTests.Domain.VehiclesTrabalho
{

    public class VehicleServiceTest
    {

        DateTime dataEntrada = new DateTime(2020,01,10);


        [Fact]
        public void VehicleServiceConstrutor()
        {

            var mockBlocoRepo = new Mock<IVehicleRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new VehicleService(mockUnitRepo.Object, mockBlocoRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var vehicle1 =  new Vehicle("25-GH-54", "43f9hjd3920ga", "Condutor", this.dataEntrada);

            var vehicle2 = new VehicleMapper("25-GH-54", "43f9hjd3920ga", "Condutor", this.dataEntrada);

            var mockRepo = new Mock<IVehicleRepository>();
            mockRepo.Setup(repo => repo.AddAsync(vehicle1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new VehicleService(mockUnitRepo.Object, mockRepo.Object);

            var vehicle = await service.AddAsync(vehicle2);

            Assert.Equal(vehicle.Matricula, vehicle2.Matricula);

        }
    }
}