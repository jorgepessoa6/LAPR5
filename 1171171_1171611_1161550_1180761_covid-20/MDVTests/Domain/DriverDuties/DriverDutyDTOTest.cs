using System;

using System.Collections.Generic;
using Xunit;
using MDV.Domain.VehicleDuties;
using MDV.Domain.WorkBlocks;
using MDV.Domain.DriverDuties;

namespace MDVTestes.Domain.DriverDuties
{

    public class DriverDutyDTOTest
    {

        public Guid Id = Guid.NewGuid();
        public string code = "key";

        public string rgb = "RGB(12,12,12)";
     
        public List<WorkBlock> wb = new List<WorkBlock>();

        [Fact]
        public void DriverDutyDTOConstructor()
        {
            var vdDTO = new DriverDutyDTO(this.Id, this.code,this.wb, this.rgb);
            Assert.NotNull(vdDTO);
            Assert.Equal(vdDTO.Id, this.Id);
            Assert.Equal(vdDTO.Code, this.code);
            Assert.Equal(vdDTO.RGB, this.rgb);
            Assert.Equal(vdDTO.WorkBlocks, this.wb);

        }
    }
}
