using System;
using System.Collections.Generic;
using System.Linq;
using MDV.Domain.WorkBlocks;
using MDV.Domain.Shared;
using MDV.Domain.Trips;
using Xunit;
using Moq;

namespace MDVTestes.Domain.Trips
{

    public class TripServiceTest
    {
        public Guid Id = Guid.NewGuid();
        public string key = "key";
        public bool isEmpty = true;
        public Direction Orientation = Direction.Go;
        public string lineKey = "line";
        public string path = "path";
        public bool isGenerated = true;

        public List<PassingTime> passingTimes = new List<PassingTime>();

        public List<WorkBlock> workBlocks = new List<WorkBlock>();

        DateTime dateTime = new DateTime(2021, 1, 1);

        public Guid Id2 = Guid.NewGuid();
        public string key2 = "key";
        public bool isEmpty2 = true;
        public Direction Orientation2 = Direction.Go;
        public string lineKey2 = "line";
        public string path2 = "path";
        public bool isGenerated2 = true;

        public List<PassingTime> passingTimes2 = new List<PassingTime>();

        public List<WorkBlock> workBlocks2 = new List<WorkBlock>();

        public DateTime dateTime2 = new DateTime(2021, 1, 1);

        public string trip = "trip";


        [Fact]
        public void TripServiceConstructor()
        {
            var mockTripRepo = new Mock<ITripRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new TripService(mockUnitRepo.Object, mockTripRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var mockTripRepo = new Mock<ITripRepository>();

            var trip = new Trip(this.key, this.isEmpty,
            this.Orientation, this.lineKey, this.path, this.isGenerated,
            this.passingTimes);


            var tripMapper = new TripMapper(this.key, this.isEmpty,
            this.Orientation, this.lineKey, this.path, this.isGenerated,
            this.passingTimes);

            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.AddAsync(trip));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new TripService(mockUnitRepo.Object, mockTripRepo.Object);
            var tripA = new TripMapper[1];
            tripA[0] = tripMapper;

            var trip2 = await service.AddAsync(tripA);

            Assert.Equal(trip2.Count(), tripA.Count());

        }

        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue = "99999999-9999-9999-9999-999999999999";

            var id = new TripId(Guid.Parse(IdValue));
            var trip = new Trip(IdValue, this.key, this.isEmpty,
            this.Orientation, this.lineKey, this.path, this.isGenerated,
            this.passingTimes);

            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(trip);
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new TripService(mockUnitRepo.Object, mockRepo.Object);

            var trip2 = await service.GetByIdAsync(id);

            Assert.Equal(IdValue, trip2.Id.ToString());
        }

        [Fact]
        public async void GetAllTripsTest()
        {
            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(GetTrips());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new TripService(mockUnitRepo.Object, mockRepo.Object);

            var trips = await service.GetAllTrips();

            var tripDTOs = GetTripsDTO();

            Assert.Equal(tripDTOs.Count(), trips.Count());

        }

        [Fact]
        public async void GetAllOfLineAsyncTest()
        {
            /* String line = "line"; */
            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.GetAllOfLineAsync(lineKey))
                .ReturnsAsync(GetTrips());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new TripService(mockUnitRepo.Object, mockRepo.Object);

            var trips = await service.GetAllOfLineAsync(lineKey);

            var tripDTOs = GetTripsDTO();

            Assert.Equal(tripDTOs.Count(), trips.Count());

        }

        [Fact]
        public async void getTripsWithoutWorkBlockTest()
        {
            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.getTripsWithoutWorkBlock())
                .ReturnsAsync(GetTrips());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new TripService(mockUnitRepo.Object, mockRepo.Object);

            var trips = await service.getTripsWithoutWorkBlock();

            var tripDTOs = GetTripsDTO();

            Assert.Equal(tripDTOs.Count(), trips.Count());

        }

        [Fact]
        public async void getPassigTimesTest()
        {
            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.GetPassingTimes(trip))
                .ReturnsAsync(GetPassingTimes());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new TripService(mockUnitRepo.Object, mockRepo.Object);

            var trips = await service.getPassigTimes(trip);

            var tripDTOs = GetTripsDTO();

            Assert.Equal(tripDTOs.Count(), trips.Count());

        }



        private List<Trip> GetTrips()
        {
            var trips = new List<Trip>();
            trips.Add(new Trip(
                this.key,
                this.isEmpty,
                this.Orientation,
                this.lineKey,
                this.path,
                this.isGenerated,
                this.passingTimes                
                ));

            trips.Add(new Trip(
                this.key2,
                this.isEmpty2,
                this.Orientation2,
                this.lineKey2,
                this.path2,
                this.isGenerated2,
                this.passingTimes2
                ));

            return trips;
        }

        private List<PassingTime> GetPassingTimes()
        {
            var passingTimes = new List<PassingTime>();
            passingTimes.Add(new PassingTime(
                "PassingTime:1", 
                10000, "Node:1", 
                true, 
                true
                ));

            passingTimes.Add(new PassingTime(
                "PassingTime:2", 
                10000, "Node:2", 
                true, 
                true
                ));

            return passingTimes;
        }

        private List<TripDTO> GetTripsDTO()
        {
            List<TripDTO> trips = new List<TripDTO>();
            trips.Add(new TripDTO(
                this.Id,
                this.key,
                this.isEmpty,
                this.Orientation,
                this.lineKey,
                this.path,
                this.isGenerated,
                this.passingTimes
                ));

            trips.Add(new TripDTO(
                this.Id2,
                this.key2,
                this.isEmpty2,
                this.Orientation2,
                this.lineKey2,
                this.path2,
                this.isGenerated2,
                this.passingTimes2
                ));

            return trips;
        }


    }


}