using System;
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

namespace MDVTestes.Domain.VehicleDuties
{

    public class VehicleDutyTest
    {

        public Guid Id = Guid.NewGuid();
        public string code = "key";
        public List<String> workblocks = new List<String>();

        public Guid Id2 = Guid.NewGuid();
        public string code2 = "key";
        public List<WorkBlock> workblocks2 = new List<WorkBlock>();
        public List<String> trips3 = new List<String>();


        [Fact]
        public void VehicleDutyServiceConstrutor()
        {
            var mockVehicleDutyRepo = new Mock<IVehicleDutyRepository>();
            var mockWorkBlockRepo = new Mock<IWorkBlockRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new VehicleDutyService(mockUnitRepo.Object, mockVehicleDutyRepo.Object, mockWorkBlockRepo.Object);

            Assert.NotNull(service);
        }



        [Fact]
        public async void AddAsyncTest()
        {
            var mockWorkBlockRepo = new Mock<IWorkBlockRepository>();

            var vd = new VehicleDuty(this.code, this.workblocks2, "RGB(12,12,12)");
            var vd2 = new VehicleDutyMapper(this.code, this.workblocks, "RGB(12,12,12)");

            var vehicledutyMapper = new VehicleDutyMapper(this.code, this.workblocks, "RGB(12,12,12)");

            var mockRepo = new Mock<IVehicleDutyRepository>();
            mockRepo.Setup(repo => repo.AddAsync(vd));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new VehicleDutyService(mockUnitRepo.Object, mockRepo.Object, mockWorkBlockRepo.Object);
            var serComp = await service.AddAsync(vd2);

            Assert.Equal(serComp.Code, vd.Code);

        }

        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue= "99999999-9999-9999-9999-999999999999";
            var id =new VehicleDutyId(Guid.Parse(IdValue));
            var mockWorkBlockRepo = new Mock<IWorkBlockRepository>();
            var sv1 = new VehicleDuty(
                IdValue,
                this.code,
                this.workblocks2,
                 "RGB(12,12,12)"
            );
            var st2 = new VehicleDutyDTO
            (
                 Guid.Parse(IdValue),
                this.code,
                this.workblocks2,
                 "RGB(12,12,12)"

            );

            var mockRepo = new Mock<IVehicleDutyRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id))
                .ReturnsAsync(sv1);
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new VehicleDutyService(mockUnitRepo.Object, mockRepo.Object, mockWorkBlockRepo.Object);

            var serVia = await service.GetByIdAsync(id);

            Assert.Equal(serVia.Id, st2.Id);
        }

        [Fact]
        public async void GetAllAsyncTest()
        {

           var mockWorkBlockRepo = new Mock<IWorkBlockRepository>();

            var mockRepo = new Mock<IVehicleDutyRepository>();
            
            mockRepo.Setup(repo => repo.GetAllVDAsync())
                .ReturnsAsync(GetvehicleDuties());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new VehicleDutyService(mockUnitRepo.Object, mockRepo.Object, mockWorkBlockRepo.Object);

            var workblocks = await service.GetAllAsync();

            var workblocksDTO = GetVehicleDutysDTO();

            Assert.Equal(workblocksDTO.Count(), workblocks.Count());

        }

        /* [Fact]
        public async void GetAllAsyncTest()
        {

           var mockWorkBlockRepo = new Mock<IWorkBlockRepository>();

            var mockRepo = new Mock<IVehicleDutyRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(GetWorkBlocks());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new VehicleDutyService(mockUnitRepo.Object, mockRepo.Object, mockWorkBlockRepo.Object);

            var vds = await service.getA();

            var workblocksDTO = GetWorkBlocksDTO();

            Assert.Equal(workblocksDTO.Count(), workblocks.Count());

        } */

        private List<VehicleDuty> GetvehicleDuties(){
        
            var vds = new List<VehicleDuty>();
            vds.Add(new VehicleDuty(
                this.code,
                this.workblocks2,
                 "RGB(12,12,12)"
                ));

            vds.Add(new VehicleDuty(
                this.code2,
                this.workblocks2,
                 "RGB(12,12,12)"
                ));

            return vds;
        } 
 
        private List<VehicleDutyDTO> GetVehicleDutysDTO()
        {
            List<VehicleDutyDTO> vds = new List<VehicleDutyDTO>();
            vds.Add(new VehicleDutyDTO(this.Id, this.code, this.workblocks2, "RGB(12,12,12)"));
            vds.Add(new VehicleDutyDTO(this.Id2, this.code2, this.workblocks2, "RGB(12,12,12)"));
            return vds;
        } 
 
    }
}