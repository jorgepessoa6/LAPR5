using System;
using Xunit;
using MDV.Domain.WorkBlocks;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.VehicleDuties;
using MDV.Domain.Trips;

namespace MDVTests.Domain.VehicleDuties
{
    public class VehicleDutyTest
    {


        [Fact]
        public void criarVehicleDutySuccess()
        {
            PassingTime passingTime = new PassingTime("PassingTime:1", 10000, "Node:1", true, true);

            List<PassingTime> passingTimes = new List<PassingTime>();

            passingTimes.Add(passingTime);

            DateTime dateTime = new DateTime(2021, 1, 1);

            Trip viagem = new Trip("Trip:1", true, Direction.Go, "Line:1", "Path:1", true, passingTimes);

            List<Trip> trips = new List<Trip>();

            trips.Add(viagem);

            WorkBlock workBlock = new WorkBlock("WorkBlock:1", 10, 10, "Node:1", "Node:2", true, true, trips);
            List<WorkBlock> lst = new List<WorkBlock>();
            lst.Add(workBlock);
            VehicleDuty v = new VehicleDuty("A",lst, "RGB(12,12,12)");
            VehicleDuty vd = new VehicleDuty("A",lst, "RGB(12,12,12)");

            Assert.NotNull(vd);
        }

    }
}