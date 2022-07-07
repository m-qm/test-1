function getMaxNuts(n, d, c, f) {
  // if the number of nuts is below the max capacity
  // we can fetch the total number of nuts in one trip
  if (n <= c) {
    var nutsAtDestination = n - d * f;
    return nutsAtDestination >= 0.0 ? nutsAtDestination : 0.0; // no more fuel; return 0
  }

  // # trips you would travel back and forth
  var numTrips = 2 * (Math.ceil(n / c) - 1) + 1;
  // how many nuts you consume per km
  var costPerKm = numTrips * f;
  // remaining weight of nuts after consumption
  var remainingNuts = c * (Math.ceil(n / c) - 1.0);
  // this is the distance you are able to travel before you
  // reach ONE LESS round trip fetching nuts
  // derived from eq: n - costPerKm * traveled = remainingNuts
  var traveled = (n - remainingNuts) / costPerKm;

  // we are able to travel greater (or equal) than the remaining
  // distance, so fetch the nuts right to the destination
  if (traveled >= d) return n - d * costPerKm;

  // calculate recursively as we travel ONE less round trip now.
  return getMaxNuts(remainingNuts, d - traveled, c, f);
}

const result = getMaxNuts(100, 20, 100, 2);
console.log(result);
