using System;
using MDV.Domain.WorkBlocks;
using System.Collections.Generic;
using MDV.Domain.Trips;
using Xunit;

namespace MDVTestes.Domain.WorkBlocks
{

    public class WorkBlockDtoTest
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

        [Fact]
        public void WorkBlockDtoConstructor()
        {
            var workBlockDTO = new WorkBlockDTO(this.Id, this.key,this.startTime,
            this.endTime, this.startNode,this.endNode,this.isCrewTravelTime,
             this.isActive,this.trips);
            Assert.NotNull(workBlockDTO);
            Assert.Equal(workBlockDTO.Id, this.Id);
            Assert.Equal(workBlockDTO.key, this.key);
            Assert.Equal(workBlockDTO.startTime, this.startTime);
            Assert.Equal(workBlockDTO.endTime, this.endTime);
            Assert.Equal(workBlockDTO.startNode, this.startNode);
            Assert.Equal(workBlockDTO.endNode, this.endNode);
            Assert.Equal(workBlockDTO.isCrewTravelTime, this.isCrewTravelTime);
            Assert.Equal(workBlockDTO.isActive, this.isActive);
            Assert.Equal(workBlockDTO.trips, this.trips);
        }
    }
}
