using System;
using MDV.Domain.DriverTypes;
using System.Collections.Generic;
using Xunit;

namespace MDVTestes.Domain.DriverTypes
{

    public class DriverTypeDtoTest
    {


        public Guid Id = Guid.NewGuid();
        public List<DriverType> TipoTripulante = new List<DriverType>();

        [Fact]
        public void DriverTypeDtoConstructor()
        {
            var driverTypeDTO = new DriverTypeDTO(this.Id, this.TipoTripulante);
            Assert.NotNull(driverTypeDTO);
            Assert.Equal(driverTypeDTO.Id, this.Id);
            Assert.Equal(driverTypeDTO.TipoTripulante, this.TipoTripulante);
        }
    }
}
