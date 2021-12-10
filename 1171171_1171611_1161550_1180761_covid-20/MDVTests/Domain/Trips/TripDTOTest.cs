using System;
using MDV.Domain.WorkBlocks;
using System.Collections.Generic;
using MDV.Domain.Trips;
using Xunit;

namespace MDVTestes.Domain.Trips
{

    public class TripDTOTest
    {

        public Guid Id = Guid.NewGuid();
        public string key = "key";
        public bool isEmpty = true;
        public Direction orientation = Direction.Go;
        public string lineKey = "Line: 1";
        public string path = "Path: 1";
        public bool isGenerated = true;
        public List<PassingTime> passingTimes = new List<PassingTime>();

        [Fact]
        public void TripDTOConstructor()
        {
            var tripDTO = new TripDTO(this.Id, this.key,this.isEmpty,
            this.orientation, this.lineKey,this.path,this.isGenerated,
             this.passingTimes);
            Assert.NotNull(tripDTO);
            Assert.Equal(tripDTO.Id, this.Id);
            Assert.Equal(tripDTO.Key, this.key);
            Assert.Equal(tripDTO.IsEmpty, this.isEmpty);
            Assert.Equal(tripDTO.Orientation, this.orientation);
            Assert.Equal(tripDTO.LineKey, this.lineKey);
            Assert.Equal(tripDTO.Path, this.path);
            Assert.Equal(tripDTO.IsGenerated, this.isGenerated);
            Assert.Equal(tripDTO.PassingTime, this.passingTimes);
           
        }
    }
}
