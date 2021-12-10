/* using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using MDV.Domain.WorkBlocks;
using MDV.Domain.Shared;
using MDV.Domain.Trips;
using MDV.Domain.VehicleDuties;
using MDV.Infrastructure.Vehicles;
using MDV.Infrastructure.VehicleDuties;

namespace MDVTestes.Domain.Import
{

    public class ImportServiceTest
    {
        [Fact]
        public void ImportServiceConstrutor()
        {
            var mocTripService = new Mock<TripService>();
            var mockWorkBlockService = new Mock<WorkBlockService>();
            var mockDriverDutyService = new Mock<DriverDutyService>();
            var mockVehicleDutyService = new Mock<VehicleDutyService>();


            var service = new ImportService(mocTripService.Object, mockWorkBlockService.Object, mockDriverDutyService.Object, mockVehicleDutyService.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            string pathMock = "pathMock";
            var mockWorkBlockRepo = new Mock<IWorkBlockRepository>();

            var vd = new VehicleDuty(this.code, this.workblocks2);
            var vd2 = new VehicleDutyMapper(this.code, this.workblocks);

            var vehicledutyMapper = new VehicleDutyMapper(this.code, this.workblocks);

            var mocTripService = new Mock<TripService>();
            mocTripService.Setup(repo => repo.AddAsync(vd));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new VehicleDutyService(mockUnitRepo.Object, mockRepo.Object, mockWorkBlockRepo.Object);
            var serComp = await service.AddAsync(vd2);

            Assert.Equal(serComp.Code, vd.Code);

        }


        private List<VehicleDuty> GetvehicleDuties()
        {

            var vds = new List<VehicleDuty>();
            vds.Add(new VehicleDuty(
                this.code,
                this.workblocks2
                ));

            vds.Add(new VehicleDuty(
                this.code2,
                this.workblocks2
                ));

            return vds;
        }

        private List<VehicleDutyDTO> GetVehicleDutysDTO()
        {
            List<VehicleDutyDTO> vds = new List<VehicleDutyDTO>();
            vds.Add(new VehicleDutyDTO(this.Id, this.code, this.workblocks2));
            vds.Add(new VehicleDutyDTO(this.Id2, this.code2, this.workblocks2));
            return vds;
        }

    }
} */