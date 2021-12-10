using System;

using System.Collections.Generic;
using Xunit;
using MDV.Domain.VehicleDuties;
using MDV.Domain.WorkBlocks;

namespace MDVTestes.Domain.VehicleDuties
{

    public class VehicleDutyDTOTest
    {

        public Guid Id = Guid.NewGuid();
        public string code = "key";
     
        public List<WorkBlock> wb = new List<WorkBlock>();

        [Fact]
        public void VehicleDutyDTOConstructor()
        {
            var vdDTO = new VehicleDutyDTO(this.Id, this.code,this.wb, "RGB(12,12,12)");
            Assert.NotNull(vdDTO);
            Assert.Equal(vdDTO.Id, this.Id);
            Assert.Equal(vdDTO.Code, this.code);
            Assert.Equal(vdDTO.WorkBlocks, this.wb);
            Assert.Equal(vdDTO.RGB, "RGB(12,12,12)");

        }
    }
}
