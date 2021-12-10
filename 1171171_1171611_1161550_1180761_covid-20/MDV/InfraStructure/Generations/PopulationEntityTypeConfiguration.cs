using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.Generations;

namespace MDV.Infrastructure.Generations
{
    internal class PopulationEntityTypeConfiguration : IEntityTypeConfiguration<Population>
    {
        public void Configure(EntityTypeBuilder<Population> builder)
        {
            builder.HasKey(b => b.Id);
        }
    }
}