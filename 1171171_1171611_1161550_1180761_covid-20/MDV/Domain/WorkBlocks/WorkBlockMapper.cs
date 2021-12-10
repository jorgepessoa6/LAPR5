using System;
using System.Collections.Generic;
using MDV.Domain.Trips;

namespace MDV.Domain.WorkBlocks
{
    public class WorkBlockMapper
    {
        public string key { get; set; }
        public int startTime { get; set; }
        public int endTime { get; set; }
        public string startNode { get; set; }
        public string endNode { get; set; }
        public bool isCrewTravelTime { get; set; }
        public bool isActive { get; set; }
        public List<string> trips { get; set; }

        public WorkBlockMapper(string key, int startTime, int endTime, string startNode, string endNode, bool isCrewTravelTime, bool isActive, List<string> trips)
        {
            this.key = key;
            this.startTime = startTime;
            this.endTime = endTime;
            this.startNode = startNode;
            this.endNode = endNode;
            this.isCrewTravelTime = isCrewTravelTime;
            this.isActive = isActive;
            this.trips = trips;
        }
    }
}