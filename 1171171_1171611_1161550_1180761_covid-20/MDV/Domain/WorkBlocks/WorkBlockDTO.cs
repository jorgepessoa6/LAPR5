using System;
using System.Collections.Generic;
using MDV.Domain.Trips;

namespace MDV.Domain.WorkBlocks
{
    public class WorkBlockDTO
    {
        public Guid Id { get; set; }
        public string key { get;  set; }
        public int startTime { get;  set; }
        public int endTime { get;  set; }
        public string startNode { get;  set; }
        public string endNode { get;  set; }
        public bool isCrewTravelTime { get;  set; }
        public bool isActive { get;  set; }
        public List<Trip> trips {get;set;}

        public WorkBlockDTO(Guid Id,string key, int startTime,int endTime,string startNode,string endNode,bool isCrewTravelTime,bool isActive,List<Trip> trips)
        {
            this.Id=Id;
            this.key = key;
            this.startTime=startTime;
            this.endTime=endTime;
            this.startNode=startNode;
            this.endNode=endNode;
            this.isCrewTravelTime=isCrewTravelTime;
            this.isActive=isActive;
            this.trips=trips;
        }
    }
}