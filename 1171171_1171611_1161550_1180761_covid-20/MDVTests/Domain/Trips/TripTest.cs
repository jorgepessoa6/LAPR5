using System;
using Xunit;
using MDV.Domain.Trips;
using MDV.Domain.Shared;
using System.Collections.Generic;

namespace MDVTestes.Domain.Trips
{
    public class TripTest
    {

        [Fact]
        public void criarTripSuccess()
        {
            PassingTime passingTime = new PassingTime("PassingTime:1", 10000, "Node:1", true, true);

            List<PassingTime> passingTimes = new List<PassingTime>();

            passingTimes.Add(passingTime);

           

            Trip viagem = new Trip("Trip:1", true, Direction.Go, "Line:1", "Path:1", true, passingTimes);
            Assert.NotNull(viagem);
        }

        [Fact]
        public void criarTripFail()
        {

            PassingTime passingTime = new PassingTime("PassingTime:1", 10000, "Node:1", true, true);

            List<PassingTime> passingTimes = new List<PassingTime>();

            passingTimes.Add(passingTime);

            Assert.Throws<BusinessRuleValidationException>(() => new Trip("Trip:1", true, Direction.Go, null, null, true, passingTimes));
        }


    }
}