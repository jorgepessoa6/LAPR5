using System;
using Xunit;
using MDV.Domain.Vehicles;
using MDV.Domain.Shared;
using System.Collections.Generic;

namespace test.Domain.VehicleTest
{
    public class VehicleTest
    {

        

        [Fact]
        public void criarVehicleSuccess()
        {
            
            DateTime dataEntrada = new DateTime(2020,01,10);

            Vehicle viatura = new Vehicle("25-GH-54", "43f9hjd3920ga", "Condutor", dataEntrada);
            Assert.NotNull(viatura);
        }

        [Fact]
        public void criarVehicleFail()
        {

            DateTime dataEntrada = new DateTime(2021,1,1);

            Assert.Throws<BusinessRuleValidationException>(() => new Vehicle("25-GH-54", "43f9hjd3920ga", null, dataEntrada));
        }
    }
}