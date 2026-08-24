import { useState } from 'react';
import { Calendar, MapPin, Plus, Trash2, Check, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

interface TripDay {
  day: number;
  destinations: string[];
  activities: string[];
}

const availableDestinations = [
  'Sigiriya', 'Ella', 'Galle Fort', 'Kandy', 'Nuwara Eliya', 
  'Yala National Park', 'Mirissa', 'Anuradhapura'
];

const availableActivities = [
  'Sightseeing', 'Wildlife Safari', 'Beach Activities', 'Tea Plantation Tour',
  'Cultural Shows', 'Hiking', 'Water Sports', 'Temple Visits'
];

export default function TripPlanner() {
  const [step, setStep] = useState(1);
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('7');
  const [travelers, setTravelers] = useState('2');
  const [budget, setBudget] = useState('');
  const [tripDays, setTripDays] = useState<TripDay[]>([
    { day: 1, destinations: [], activities: [] },
  ]);

  const addDay = () => {
    setTripDays([...tripDays, { day: tripDays.length + 1, destinations: [], activities: [] }]);
  };

  const removeDay = (dayIndex: number) => {
    if (tripDays.length > 1) {
      setTripDays(tripDays.filter((_, index) => index !== dayIndex));
    }
  };

  const addDestinationToDay = (dayIndex: number, destination: string) => {
    const newTripDays = [...tripDays];
    if (!newTripDays[dayIndex].destinations.includes(destination)) {
      newTripDays[dayIndex].destinations.push(destination);
      setTripDays(newTripDays);
    }
  };

  const removeDestinationFromDay = (dayIndex: number, destination: string) => {
    const newTripDays = [...tripDays];
    newTripDays[dayIndex].destinations = newTripDays[dayIndex].destinations.filter(d => d !== destination);
    setTripDays(newTripDays);
  };

  const addActivityToDay = (dayIndex: number, activity: string) => {
    const newTripDays = [...tripDays];
    if (!newTripDays[dayIndex].activities.includes(activity)) {
      newTripDays[dayIndex].activities.push(activity);
      setTripDays(newTripDays);
    }
  };

  const estimatedCost = parseInt(duration) * parseInt(travelers) * 75; // Simple calculation

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-white/90">
            Create a personalized itinerary for your Sri Lankan adventure
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-muted/50'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-32 mt-4">
            <span className={step >= 1 ? 'text-primary' : 'text-gray-500'}>Basic Info</span>
            <span className={step >= 2 ? 'text-primary' : 'text-gray-500'}>Itinerary</span>
            <span className={step >= 3 ? 'text-primary' : 'text-gray-500'}>Review</span>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="bg-card rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl text-foreground mb-6">Trip Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-foreground mb-2">Trip Name</label>
                <Input
                  type="text"
                  placeholder="e.g., Amazing Sri Lanka Adventure"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-foreground mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">Duration (days)</label>
                  <Input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-foreground mb-2">Number of Travelers</label>
                  <Input
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">Budget (USD)</label>
                  <Input
                    type="number"
                    placeholder="Per person"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} size="lg">
                  Next: Build Itinerary
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Itinerary Builder */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-foreground">Day-by-Day Itinerary</h2>
                <Button onClick={addDay} variant="outline" className="gap-2">
                  <Plus className="w-5 h-5" />
                  Add Day
                </Button>
              </div>

              <div className="space-y-6">
                {tripDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-foreground">Day {day.day}</h3>
                      {tripDays.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDay(dayIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Destinations */}
                      <div>
                        <label className="block text-sm text-foreground mb-2">Destinations</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {day.destinations.map((dest) => (
                            <Badge key={dest} className="bg-primary text-white gap-2 px-3 py-1">
                              <MapPin className="w-3 h-3" />
                              {dest}
                              <button
                                onClick={() => removeDestinationFromDay(dayIndex, dest)}
                                className="ml-1 hover:text-red-200"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {availableDestinations.map((dest) => (
                            <Badge
                              key={dest}
                              onClick={() => addDestinationToDay(dayIndex, dest)}
                              className={`cursor-pointer ${
                                day.destinations.includes(dest)
                                  ? 'bg-muted/50 text-gray-400'
                                  : 'bg-muted text-foreground hover:bg-muted/50'
                              }`}
                            >
                              {dest}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Activities */}
                      <div>
                        <label className="block text-sm text-foreground mb-2">Activities</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {day.activities.map((activity) => (
                            <Badge key={activity} variant="secondary" className="gap-2 px-3 py-1">
                              {activity}
                              <button
                                onClick={() => {
                                  const newTripDays = [...tripDays];
                                  newTripDays[dayIndex].activities = newTripDays[dayIndex].activities.filter(a => a !== activity);
                                  setTripDays(newTripDays);
                                }}
                                className="ml-1 hover:text-red-600"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {availableActivities.map((activity) => (
                            <Badge
                              key={activity}
                              onClick={() => addActivityToDay(dayIndex, activity)}
                              className={`cursor-pointer ${
                                day.activities.includes(activity)
                                  ? 'bg-muted/50 text-gray-400'
                                  : 'bg-muted text-foreground hover:bg-muted/50'
                              }`}
                            >
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={() => setStep(1)} variant="outline">
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  Review & Finish
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl text-foreground mb-6">Trip Summary</h2>
              
              <div className="space-y-6">
                {/* Trip Details */}
                <div className="bg-background rounded-xl p-6">
                  <h3 className="text-xl text-foreground mb-4">{tripName || 'My Sri Lanka Trip'}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="text-foreground">{startDate || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-foreground">{duration} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Travelers</p>
                      <p className="text-foreground">{travelers} people</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="text-foreground">${budget || 'Not set'} pp</p>
                    </div>
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <h3 className="text-xl text-foreground mb-4">Itinerary</h3>
                  <div className="space-y-4">
                    {tripDays.map((day) => (
                      <div key={day.day} className="border-l-4 border-primary pl-6 py-2">
                        <h4 className="text-lg text-foreground mb-2">Day {day.day}</h4>
                        {day.destinations.length > 0 && (
                          <div className="mb-2">
                            <p className="text-sm text-muted-foreground mb-1">Destinations:</p>
                            <div className="flex flex-wrap gap-2">
                              {day.destinations.map((dest) => (
                                <Badge key={dest} className="bg-primary/10 text-primary">
                                  {dest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {day.activities.length > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Activities:</p>
                            <div className="flex flex-wrap gap-2">
                              {day.activities.map((activity) => (
                                <Badge key={activity} variant="secondary">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost Estimation */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <h3 className="text-xl text-foreground">Estimated Cost</h3>
                  </div>
                  <p className="text-3xl text-primary mb-2">${estimatedCost}</p>
                  <p className="text-sm text-muted-foreground">
                    Based on {duration} days for {travelers} travelers
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    * This is a rough estimate. Actual costs may vary based on accommodation, activities, and transport choices.
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={() => setStep(2)} variant="outline">
                  Back to Itinerary
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">Save Trip</Button>
                  <Button>Book Now</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


