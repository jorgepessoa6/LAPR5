using System.Threading.Tasks;
using System.Collections.Generic;

using System;
using MDV.Domain.WorkBlocks;

using System.Xml;
using MDV.Domain.Trips;
using MDV.Domain.DriverDuties;
using MDV.Domain.VehicleDuties;
using System.Net.Http;

namespace MDV.Domain.Import
{
    public class ImportService
    {
        private readonly TripService tService;

        private readonly WorkBlockService wbService;

        private static readonly string MDR_GETLINE_URL = "https://mdrlapr.azurewebsites.net/api/line/filtrarKey/";

        private readonly DriverDutyService ddService;

        private readonly VehicleDutyService vdService;

        static readonly HttpClient client = new HttpClient();

        public ImportService(TripService tService, WorkBlockService workBlockService, DriverDutyService ddService, VehicleDutyService vdService)
        {
            this.tService = tService;
            this.wbService = workBlockService;
            this.ddService = ddService;
            this.vdService = vdService;
        }

        public async Task<Boolean> ImportXML(string path)
        {

            XmlDocument document = new XmlDocument();

            document.Load(path); // Load XML File

            XmlNodeList trips = document.GetElementsByTagName("Trip");
            XmlNodeList wbs = document.GetElementsByTagName("WorkBlock");
            XmlNodeList driverDuties = document.GetElementsByTagName("DriverDuty");
            XmlNodeList vehicleDuties = document.GetElementsByTagName("VehicleDuty");

            bool bool1 = await importTrip(trips);
            bool bool2 = await importWorkBlocks(wbs);
            bool bool3 = await importDriverDuties(driverDuties);
            bool bool4 = await importVehicleDuties(vehicleDuties);

            if (bool1 && bool2 && bool3 && bool4)
            {
                return true;
            }
            return false;

        }

        private async Task<string> nameOfLine(string line)
        {
            string responseBody = await client.GetStringAsync(MDR_GETLINE_URL+ line);
            Console.WriteLine(responseBody);
            var split = responseBody.Split("name\":\"");
            string[] split2 = split[1].Split("\"");
            Console.WriteLine(split2[0]);
            return split2[0];

        }

        private async Task<bool> importTrip(XmlNodeList trips)
        {
            try
            {
                TripMapper[] tripList = new TripMapper[trips.Count];
                int i = 0;
                foreach (XmlNode tripXML in trips)
                {

                    string orientation = tripXML.Attributes["Orientation"].InnerText;
                    Direction d = Direction.Return; ;
                    if (orientation.Equals("Go"))
                    {
                        d = Direction.Go;
                    }

                    string pa = tripXML.Attributes["Path"].InnerText;
                    bool isEmpty = bool.Parse(tripXML.Attributes["IsEmpty"].InnerText);
                    bool isGenerated = bool.Parse(tripXML.Attributes["IsGenerated"].InnerText);
                    string line;
                    try
                    {
                        line = tripXML.Attributes["Line"].InnerText;
                        line = await nameOfLine(line);

                    }
                    catch (System.Exception)
                    {

                        line = null;
                    }

                    string key = tripXML.Attributes["key"].InnerText;
                    List<PassingTime> lstPassingTimes = new List<PassingTime>();
                    foreach (XmlNode passingTimeXML in tripXML.ChildNodes[0].ChildNodes)
                    {
                        string ptKey = passingTimeXML.Attributes["key"].InnerText;
                        string ptNode = passingTimeXML.Attributes["Node"].InnerText;
                        bool ptIsRP = bool.Parse(passingTimeXML.Attributes["IsReliefPoint"].InnerText);
                        bool ptIsUsed = bool.Parse(passingTimeXML.Attributes["IsUsed"].InnerText);
                        int ptTime = Int32.Parse(passingTimeXML.Attributes["Time"].InnerText);
                        PassingTime p = new PassingTime(ptKey, ptTime, ptNode, ptIsUsed, ptIsRP);
                        lstPassingTimes.Add(p);
                    }

                    TripMapper t = new TripMapper(key, isEmpty, d, line, pa, isGenerated, lstPassingTimes);

                    tripList[i] = t;
                    i++;
                }
                await tService.AddAsync(tripList);
                return true;
            }
            catch (System.Exception)
            {

                return false;
            }
        }
        private async Task<bool> importWorkBlocks(XmlNodeList wbs)
        {

            try
            {
                int i = 0;
                WorkBlockMapper[] wbList = new WorkBlockMapper[wbs.Count];
                foreach (XmlNode wbsXML in wbs)
                {
                    string key = wbsXML.Attributes["key"].InnerText;
                    string endNode = wbsXML.Attributes["EndNode"].InnerText;
                    string startNode = wbsXML.Attributes["StartNode"].InnerText;
                    int startTime = Int32.Parse(wbsXML.Attributes["StartTime"].InnerText);
                    int endTime = Int32.Parse(wbsXML.Attributes["EndTime"].InnerText);
                    bool isActive = bool.Parse(wbsXML.Attributes["IsActive"].InnerText);
                    bool IsCrewTravelTime = bool.Parse(wbsXML.Attributes["IsCrewTravelTime"].InnerText);

                    List<string> lstPassingTimes = new List<string>();
                    foreach (XmlNode tripXML in wbsXML.ChildNodes[0].ChildNodes)
                    {
                        string ptKey = tripXML.Attributes["key"].InnerText;
                        Trip tripTemp = await this.tService.getTripsOfKey(ptKey);

                        lstPassingTimes.Add(tripTemp.Id.AsString());
                    }

                    WorkBlockMapper wb = new WorkBlockMapper(key, startTime, endTime, endNode, startNode, IsCrewTravelTime, isActive, lstPassingTimes);
                    wbList[i] = wb;
                    i++;
                }
                await wbService.AddAsync(wbList);
                return true;
            }
            catch (System.Exception)
            {

                return false;
            }
        }

        private async Task<bool> importDriverDuties(XmlNodeList driverDuties)
        {

            try
            {
                DriverDutyMapper[] ddList = new DriverDutyMapper[driverDuties.Count];
                foreach (XmlNode ddXML in driverDuties)
                {

                    string name = ddXML.Attributes["Name"].InnerText;
                    string color = ddXML.Attributes["Color"].InnerText;

                    List<string> lstWb = new List<string>();
                    foreach (XmlNode wbXML in ddXML.ChildNodes[0].ChildNodes)
                    {
                        string ptKey = wbXML.Attributes["key"].InnerText;
                        WorkBlock wbTemp = await this.wbService.getWorkBlocksOfKey(ptKey);

                        lstWb.Add(wbTemp.Id.AsString());
                    }

                    DriverDutyMapper dd = new DriverDutyMapper(name, lstWb, color);
                    await ddService.AddAsync(dd);
                }
                return true;
            }
            catch (System.Exception)
            {

                return false;
            }
        }

        private async Task<bool> importVehicleDuties(XmlNodeList vehicleDuties)
        {

            try
            {
                VehicleDutyMapper[] vdList = new VehicleDutyMapper[vehicleDuties.Count];
                foreach (XmlNode vdXML in vehicleDuties)
                {

                    string name = vdXML.Attributes["Name"].InnerText;
                    string color = vdXML.Attributes["Color"].InnerText;
                    //string color = vdXML.Attributes["Color"].InnerText;

                    List<string> lstWb = new List<string>();
                    foreach (XmlNode wbXML in vdXML.ChildNodes[0].ChildNodes)
                    {
                        string ptKey = wbXML.Attributes["key"].InnerText;
                        WorkBlock wbTemp = await this.wbService.getWorkBlocksOfKey(ptKey);

                        lstWb.Add(wbTemp.Id.AsString());
                    }

                    VehicleDutyMapper vd = new VehicleDutyMapper(name, lstWb,color);
                    await vdService.AddAsync(vd);
                }


                return true;
            }
            catch (System.Exception)
            {

                return false;
            }
        }
    }

}