using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MDV.Infrastructure;
using MDV.Infrastructure.Shared;
using MDV.Domain.Shared;
using MDV.Infrastructure.VehicleDuties;
using MDV.Domain.VehicleDuties;
using MDV.Infrastructure.WorkBlocks;
using MDV.Domain.WorkBlocks;
using MDV.Domain.Trips;
using MDV.Infrastructure.Trips;
using MDV.Infrastructure.Vehicles;
using MDV.Domain.Vehicles
;
using MDV.Infrastructure.DefineDrivers;
using MDV.Domain.DefineDrivers;
using MDV.Domain.Users;
using System.Text;
using System;
using MDV.Infrastructure.Users;
using MDV.Domain.Generations;
using MDV.Infrastructure.Generations;
using MDV.Infrastructure.DriverDuties;
using MDV.Domain.DriverDuties;
using MDV.Domain.Import;

namespace MDV
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                    ClockSkew = TimeSpan.Zero
                };
                services.AddCors();
            });

            services.AddAuthorization(config =>
            {
                config.AddPolicy(Policies.Admin, Policies.AdminPolicy());
                config.AddPolicy(Policies.User, Policies.UserPolicy());
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("IT3Client", b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
            services.AddDbContext<MDVDbContext>(opt =>
                opt.UseSqlServer("Server=tcp:20s5-3df-05.database.windows.net,1433;Initial Catalog=20s5-3df-05;Persist Security Info=False;User ID=LAPR5;Password=Covid2020;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;")
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());


            ConfigureMyServices(services);


            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }


      public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IVehicleDutyRepository,VehicleDutyRepository>();
            services.AddTransient<VehicleDutyService>();

            services.AddTransient<IDriverDutyRepository,DriverDutyRepository>();
            services.AddTransient<DriverDutyService>();

            services.AddTransient<IWorkBlockRepository,WorkBlockRepository>();
            services.AddTransient<WorkBlockService>();
            services.AddTransient<ITripRepository,TripRepository>();
            services.AddTransient<TripService>();

            services.AddTransient<IVehicleRepository, VehicleRepository>();
            services.AddTransient<VehicleService>();

            services.AddTransient<IDefineDriverRepository, DefineDriverRepository>();
            services.AddTransient<DefineDriverService>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<UserService>();
            services.AddTransient<ImportService>();
            services.AddTransient<IGenerationRepository, GenerationRepository>();
            services.AddTransient<GenerationService>();
        }
    }
}

