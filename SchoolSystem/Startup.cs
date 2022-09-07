using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SchoolSystem.Contexts;
using SchoolSystem.Entities;
using SchoolSystem.Entities;
using SchoolSystem.Repositories;
using SchoolSystem.Repositories.Contracts;

namespace SchoolSystem
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
            services.AddCors(o => o.AddPolicy("FrontendPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
            services.AddControllers();
            services.AddDbContext<MainContext>(op => op.UseMySQL(Configuration["ConnectionString:MainDb"]));

            services.AddScoped<IGenderRepository<Gender>, GenderRepository>();
            services.AddScoped<IGradeRepository<Grade>, GradeRepository>();
            services.AddScoped<IMedicalInformationRepository<MedicalInformation>, MedicalInformationRepository>();
            services.AddScoped<IStudentRepository<Student>, StudentRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors("FrontendPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
