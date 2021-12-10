using System;
using System.Collections.Generic;

namespace MDV.Domain.Trips
{
    public class TripMapper
    {
        public Guid Id { get; set; }

        public string Key { get; set; }

        public bool IsEmpty { get; set; }

        public Direction Orientation { get; set; }

        public string LineKey { get; set; }

        public string Path { get; set; }

        public bool IsGenerated { get; set; }

        public List<PassingTime> PassingTime { get; set; }


        public TripMapper(string key, bool isEmpty, Direction orientation, string lineKey, string path, bool isGenerated, List<PassingTime> passingTime)
        {
            this.Key = key;
            this.IsEmpty = isEmpty;
            this.Orientation = orientation;
            this.LineKey = lineKey;
            this.Path = path;
            this.IsGenerated = isGenerated;
            this.PassingTime = passingTime;
        }

    }
}