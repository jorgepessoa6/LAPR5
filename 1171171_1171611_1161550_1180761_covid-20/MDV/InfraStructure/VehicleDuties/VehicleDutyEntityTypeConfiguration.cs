using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.VehicleDuties;

namespace MDV.Infrastructure.VehicleDuties
{
    internal class VehicleDutyEntityTypeConfiguration : IEntityTypeConfiguration<VehicleDuty>
    {
        public void Configure(EntityTypeBuilder<VehicleDuty> builder)
        {
            //builder.ToTable("Products", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
        }
    }
}