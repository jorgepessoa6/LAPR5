using MDV.Domain.VehicleDuties;
using MDV.Domain.Trips;
using MDV.Infrastructure.VehicleDuties;
using MDV.Domain.DefineDrivers;
using MDV.Infrastructure.DefineDrivers;
using MDV.Domain.Vehicles;
using MDV.Infrastructure.Vehicles;
using MDV.Domain.WorkBlocks;
using MDV.Infrastructure.WorkBlocks;
using MDV.Infrastructure.Trips;
using Microsoft.EntityFrameworkCore;
using MDV.Domain.Users;
using MDV.Infrastructure.Users;
using MDV.Infrastructure.Generations;
using MDV.Domain.Generations;
using MDV.Domain.DriverDuties;
using MDV.Infrastructure.DriverDuties;

namespace MDV.Infrastructure
{
    public class MDVDbContext : DbContext
    {
        public DbSet<VehicleDuty> VehicleDuties { get; set; }

        public DbSet<DriverDuty> DriverDuties { get; set; }
        public DbSet<WorkBlock> WorkBlocks { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<PassingTime> PassingTimes { get; set; }
        public DbSet<DefineDriver> DefineDrivers { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Generation> Generations { get; set; }

        public DbSet<Population> Populations { get; set; }

        public MDVDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new VehicleDutyEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new DriverDutyEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new DefineDriverEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new VehicleEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new WorkBlockEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new TripEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new PassingTimeEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new GenerationEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new PopulationEntityTypeConfiguration());
        }
    }
}