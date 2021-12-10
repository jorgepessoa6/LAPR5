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

namespace MDVTestes.Domain.WorkBlocks
{

    public class WorkBlockServiceTest
    {
   
        public Guid Id = Guid.NewGuid();
        public string key = "key";
        public int startTime = 1;
        public int endTime = 1;
        public string startNode = "startNode";
        public string endNode = "endNode";
        public bool isCrewTravelTime = true;
        public bool isActive = false;
        public List<Trip> trips = new List<Trip>();

        public Guid Id2 = Guid.NewGuid();
        public string key2 = "key";
        public int startTime2 = 1;
        public int endTime2 = 1;
        public string startNode2 = "startNode";
        public string endNode2 = "endNode";
        public bool isCrewTravelTime2 = true;
        public bool isActive2 = false;
        public List<Trip> trips2 = new List<Trip>();
        public List<String> trips3 = new List<String>();


        [Fact]
        public void WorkBlockServiceConstrutor()
        {
            var mockWorkBlockRepo = new Mock<IWorkBlockRepository>();
            var mockTripRepo = new Mock<ITripRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new WorkBlockService(mockUnitRepo.Object, mockWorkBlockRepo.Object, mockTripRepo.Object);

            Assert.NotNull(service);
        }



        [Fact]
        public async void AddAsyncTest()
        {
            var mockTripRepo = new Mock<ITripRepository>();

            var workBlock = new WorkBlock(this.key,this.startTime,
            this.endTime, this.startNode,this.endNode,this.isCrewTravelTime,
            this.isActive,this.trips);
        

            var workBlockMapper = new WorkBlockMapper(this.key,this.startTime,
            this.endTime, this.startNode,this.endNode,this.isCrewTravelTime,
             this.isActive,this.trips3);

            var mockRepo = new Mock<IWorkBlockRepository>();
            mockRepo.Setup(repo => repo.AddAsync(workBlock));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new WorkBlockService(mockUnitRepo.Object, mockRepo.Object, mockTripRepo.Object);
            var workBlockA = new WorkBlockMapper[1];
            workBlockA[0] = workBlockMapper;

            var workblock2 = await service.AddAsync(workBlockA);

            Assert.Equal(workblock2.Count(), workBlockA.Count());

        }

        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue= "99999999-9999-9999-9999-999999999999";
            var mockTripRepo = new Mock<ITripRepository>(); 

            var id =new WorkBlockId(Guid.Parse(IdValue));
            var workBlock = new WorkBlock(IdValue,this.key,this.startTime,
            this.endTime, this.startNode,this.endNode,this.isCrewTravelTime,
            this.isActive,this.trips);

            var mockRepo = new Mock<IWorkBlockRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(workBlock);
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new WorkBlockService(mockUnitRepo.Object, mockRepo.Object, mockTripRepo.Object);

            var workblock2 = await service.GetByIdAsync(id);

            Assert.Equal(IdValue, workblock2.Id.ToString());
        }

        [Fact]
        public async void GetAllAsyncTest()
        {

            var mockTripRepo = new Mock<ITripRepository>();

            var mockRepo = new Mock<IWorkBlockRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(GetWorkBlocks());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new WorkBlockService(mockUnitRepo.Object, mockRepo.Object, mockTripRepo.Object);

            var workblocks = await service.GetAllWorkBlocks();

            var workblocksDTO = GetWorkBlocksDTO();

            Assert.Equal(workblocksDTO.Count(), workblocks.Count());

        }

        
        [Fact]
        public async void GetContiguousWorkBlockTest()
        {

            var mockTripRepo = new Mock<ITripRepository>();

            var mockRepo = new Mock<IWorkBlockRepository>();
            mockRepo.Setup(repo => repo.GetContiguousWorkBlock(startTime))
                .ReturnsAsync(GetWorkBlocks());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new WorkBlockService(mockUnitRepo.Object, mockRepo.Object, mockTripRepo.Object);

            var workblocks = await service.GetContiguousWorkBlock(startTime);

            var workblocksDTO = GetWorkBlocksDTO();

            Assert.Equal(workblocksDTO.Count(), workblocks.Count());

        }

        [Fact]
        public async void GetContiguousOfVehicleServiceTest()
        {

            var mockTripRepo = new Mock<ITripRepository>();

            var mockRepo = new Mock<IWorkBlockRepository>();
            mockRepo.Setup(repo => repo.GetContiguousOfVehicleService(startTime,key))
                .ReturnsAsync(GetWorkBlocks());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new WorkBlockService(mockUnitRepo.Object, mockRepo.Object, mockTripRepo.Object);

            var workblocks = await service.GetContiguousOfVehicleService(startTime,key);

            var workblocksDTO = GetWorkBlocksDTO();

            Assert.Equal(workblocksDTO.Count(), workblocks.Count());

        }

        private List<WorkBlock> GetWorkBlocks()
        {
            var workblocks = new List<WorkBlock>();
            workblocks.Add(new WorkBlock(
                this.key,
                this.startTime,
                this.endTime,
                this.startNode,
                this.endNode,
                this.isCrewTravelTime,
                this.isActive,
                this.trips
                ));

            workblocks.Add(new WorkBlock(
                this.key2,
                this.startTime2,
                this.endTime2,
                this.startNode2,
                this.endNode2,
                this.isCrewTravelTime2,
                this.isActive2,
                this.trips2
                ));

            return workblocks;
        }

        private List<WorkBlockDTO> GetWorkBlocksDTO()
        {
            List<WorkBlockDTO> workblocks = new List<WorkBlockDTO>();
            workblocks.Add(new WorkBlockDTO(this.Id, this.key,this.startTime,
            this.endTime, this.startNode,this.endNode,this.isCrewTravelTime,
             this.isActive,this.trips));
            workblocks.Add(new WorkBlockDTO(this.Id2, this.key2,this.startTime2,
            this.endTime2, this.startNode2,this.endNode2,this.isCrewTravelTime2,
             this.isActive2,this.trips2));
            return workblocks;
        }

    }
}