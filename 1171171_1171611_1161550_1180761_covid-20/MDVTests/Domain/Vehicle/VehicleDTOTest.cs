using System;
using MDV.Domain.Vehicles;
using System.Collections.Generic;
using Xunit;

namespace MDVTestes.Domain.Vehicle
{

    public class VehicleDtoTest
    {

        public Guid Id = Guid.NewGuid();
        public string Matricula = "matricula";
        public string VIN = "VIN";
        public string Tipo = "Tipo";
        public DateTime DataEntrada = new DateTime(1999,4,4);

        [Fact]
        public void VehicleDtoConstructor()
        {
            var vehicleDTO = new VehicleDTO(this.Id, this.Matricula,this.VIN,
            this.Tipo, this.DataEntrada);
            Assert.NotNull(vehicleDTO);
            Assert.Equal(vehicleDTO.Id, this.Id);
            Assert.Equal(vehicleDTO.Matricula, this.Matricula);
            Assert.Equal(vehicleDTO.VIN, this.VIN);
            Assert.Equal(vehicleDTO.Tipo, this.Tipo);
            Assert.Equal(vehicleDTO.DataEntrada, this.DataEntrada);
        }
    }
}
