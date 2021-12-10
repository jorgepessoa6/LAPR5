using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.Trips;

namespace MDV.Infrastructure.Trips
{
    internal class TripEntityTypeConfiguration : IEntityTypeConfiguration<Trip>
    {
        public void Configure(EntityTypeBuilder<Trip> builder)
        {
            //builder.ToTable("Products", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
        }
    }
}