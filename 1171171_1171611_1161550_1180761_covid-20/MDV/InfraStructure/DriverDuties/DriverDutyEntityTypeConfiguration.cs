using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.VehicleDuties;
using MDV.Domain.DriverDuties;

namespace MDV.Infrastructure.DriverDuties
{
    internal class DriverDutyEntityTypeConfiguration : IEntityTypeConfiguration<DriverDuty>
    {
        public void Configure(EntityTypeBuilder<DriverDuty> builder)
        {
            //builder.ToTable("Products", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
        }
    }
}