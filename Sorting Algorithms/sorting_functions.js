// Jeevan Reddy Bodapatla - 1001949287

var inputData = [];
var arrSelected = [];
var results = [];
const colors = [
  "deeppink",
  "red",
  "orange",
  "gold",
  "green",
  "blue",
  "indigo",
  "purple",
  "violet",
  "pink",
];

//getting selected option from dropdown select
$(document).ready(function () {
  $("#selectAlgo").on("change", function () {
    arrSelected = [];
    var selected = $(this).find("option:selected");
    selected.each(function () {
      arrSelected.push($(this).val());
    });
  });
});

//getting user inputed array size from text field and generating random array
function getTextData() {
  if (
    document.getElementById("inputValue").value.length > 0 &&
    arrSelected.length > 0
  ) {
    var elementData = document.getElementById("inputValue").value;
    elementData = parseInt(elementData);
    inputData = Array(elementData)
      .fill()
      .map(() => Math.floor(100 * Math.random()));
    document.getElementById("inputData").innerHTML +=
      "<b>" + "Input Data : " + inputData + "<br>";
    sortingAlgo(arrSelected, inputData);
  } else inputData = [];
}

//Calling the sorting algorithm based on user selection
function sortingAlgo(selectedValues, Data) {
  for (let i = 0; i < selectedValues.length; i++) {
    switch (selectedValues[i]) {
      case "selection_sort":
        const SortStarted = performance.now() + performance.timeOrigin;
        const Sort_Array = selectionSort(Data);
        const SortEnded = performance.now() + performance.timeOrigin;
        getExcecutionTime(
          SortStarted,
          SortEnded,
          "Selection sort",
          Sort_Array
        );
        break;
      case "insertion_sort":
        const SortStartedI = performance.now() + performance.timeOrigin;
        const Sorted_arayI = insertionSort(Data);
        const SortendedI = performance.now() + performance.timeOrigin;
        getExcecutionTime(
          SortStartedI,
          SortendedI,
          "Insertion sort",
          Sorted_arayI
        );
        break;
      case "bubble_sort":
        const SortStartedB = performance.now() + performance.timeOrigin;
        const Sorted_arayB = bubbleSort(Data);
        const SortEndedB = performance.now() + performance.timeOrigin;
        getExcecutionTime(
          SortStartedB,
          SortEndedB,
          "Bubble sort",
          Sorted_arayB
        );
        break;
      case "merge_sort":
        const SortStartedM = performance.now() + performance.timeOrigin;
        const Sorted_arayM = mergeSort(Data);
        const SortEndedM = performance.now() + performance.timeOrigin;
        getExcecutionTime(
          SortStartedM,
          SortEndedM,
          "Merge sort",
          Sorted_arayM
        );
        break;
      case "heap_sort":
        const SortStartedH = performance.now() + performance.timeOrigin;
        const Sort_ArayH = heapSort(Data);
        const SortEndedH = performance.now() + performance.timeOrigin;
        getExcecutionTime(
          SortStartedH,
          SortEndedH,
          "Heap sort",
          Sort_ArayH
        );
        break;
      case "quick_sort":
        const SortStartedQ = performance.now() + performance.timeOrigin;
        const Sorted_arayQ = quickSort(Data, 0, Data.length - 1);
        const SortEndedQ = performance.now() + performance.timeOrigin;
        getExcecutionTime(
          SortStartedQ,
          SortEndedQ,
          "Quick sort",
          Sorted_arayQ
        );
        break;
      case "quick_sort_3":
        const SortStartedQM = performance.now() + performance.timeOrigin;
        const Sorted_arayQM = quickSort3Way(Data, 0, Data.length - 1);
        const SortEndedQM = performance.now() + performance.timeOrigin;
        getExcecutionTime(
          SortStartedQM,
          SortEndedQM,
          "3-median Quick sort",
          Sorted_arayQM
        );
        break;
    }
  }
}

function selectionSort(GivenArray) {
  let min;
  for (let i = 0; i < GivenArray.length; i++) {
    //Taking the min value and comparing it with the rest
    min = i;
    for (let j = i + 1; j < GivenArray.length; j++) {
      if (GivenArray[j] < GivenArray[min]) {
        //if less than min replace it
        min = j;
      }
    }
    //swapping element with current element
    if (min !== i) {
      [GivenArray[i], GivenArray[min]] = [
        GivenArray[min],
        GivenArray[i],
      ];
    }
  }
  return GivenArray;
}

function insertionSort(GivenArray) {
  for (let i = 0; i < GivenArray.length; i++) {
    //take the first element as key
    let val = GivenArray[i];
    let j = i - 1; //Last element of the array
    while (j >= 0 && val < GivenArray[j]) {
      GivenArray[j + 1] = GivenArray[j];
      j--;
    }
    GivenArray[j + 1] = val;
  }
  return GivenArray;
}

function bubbleSort(GivenArray) {
  for (let i = 0; i < GivenArray.length; i++) {
    for (let j = 0; j < GivenArray.length; j++) {
      //check if j is greaterthan j+1
      if (GivenArray[j] > GivenArray[j + 1]) {
        //swapping
        let temp = GivenArray[j];
        GivenArray[j] = GivenArray[j + 1];
        GivenArray[j + 1] = temp;
      }
    }
  }
  return GivenArray;
}

function mergeSort(GivenArray) {
  if (GivenArray.length <= 1) {
    return GivenArray;
  }
  //get the mid and slice the array
  const mid = Math.floor(GivenArray.length / 2);
  const leftside = GivenArray.slice(0, mid);
  const rightside = GivenArray.slice(mid, GivenArray.length);
  return array_sorter(leftside, rightside);
}

function array_sorter(leftside, rightside) {
  let sorted_Array = [];

  while (leftside.length && rightside.length) {
    if (leftside[0] <= rightside[0]) {
      //add the element to the array and remove it
      sorted_Array.push(leftside.shift());
    } else {
      sorted_Array.push(rightside.shift());
    }
  }
  //if any elements left add to the array
  while (leftside.length) {
    sorted_Array.push(leftside.shift());
  }
  while (rightside.length) {
    sorted_Array.push(rightside.shift());
  }
  return sorted_Array;
}

function heapSort(GivenArray) {
  let arraylen = GivenArray.length;

  // Building heap
  for (let i = Math.floor(arraylen / 2) - 1; i >= 0; i--)
    heapify(GivenArray, arraylen, i);

  for (let i = arraylen - 1; i > 0; i--) {
    // Moving current root element to end element
    var temp = GivenArray[0];
    GivenArray[0] = GivenArray[i];
    GivenArray[i] = temp;

    heapify(GivenArray, i, 0);
  }
  return GivenArray;
}

function heapify(GivenArray, arraylen, i) {
  let biggest = i;
  let leftside = 2 * i + 1;
  let rightside = 2 * i + 2;

  // If leftside child element is larger than root element
  if (leftside < arraylen && GivenArray[leftside] > GivenArray[biggest])
    biggest = leftside;

  // If rightside child element is larger and biggest so far
  if (rightside < arraylen && GivenArray[rightside] > GivenArray[biggest])
    biggest = rightside;

  // If biggest element is not root element
  if (biggest != i) {
    var swap = GivenArray[i];
    GivenArray[i] = GivenArray[biggest];
    GivenArray[biggest] = swap;

    heapify(GivenArray, arraylen, biggest);
  }
}

function quickSort(GivenArray, Firstvalue, lastvalue) {
  //termination condition
  if (Firstvalue < lastvalue) {
    let pie = quickSortPartition(GivenArray, Firstvalue, lastvalue);

    //sort elements before partition
    quickSort(GivenArray, Firstvalue, pie - 1);
    //sort elements after partition
    quickSort(GivenArray, pie + 1, lastvalue);
  }

  return GivenArray;
}

function quickSortPartition(GivenArray, firstvalue, lastvalue) {
  //lastvalue is selected as pivotElement
  const pivot = GivenArray[lastvalue];

  let i = firstvalue - 1;

  for (let j = firstvalue; j <= lastvalue - 1; j++) {
    // If current element is smaller than the pivot
    if (GivenArray[j] < pivot) {
      // Increment index of smaller element
      i++;
      quickSortSwap(GivenArray, i, j);
    }
  }
  quickSortSwap(GivenArray, i + 1, lastvalue);
}

function quickSortSwap(GivenArray, i, j) {
  const temp = GivenArray[i];
  GivenArray[i] = GivenArray[j];
  GivenArray[j] = temp;
}

function quickSort3Waypartition(array, left, right) {
  i = left - 1;
  j = right;
  var one = left - 1,
    two = right;
  var three = array[right];

  while (true) {

    //finding the element greater than or equal to three
    while (array[++i] < three);

    //finding the element smaller than or equal to three
    while (three < array[--j]) if (j == left) break;

    if (i >= j) break;

    //swapping smaller on left and larger on right
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    //moving same left occurences of pivot to the start of array
    if (array[i] == three) {
      one++;
      temp = array[i];
      array[i] = array[one];
      array[one] = temp;
    }

    //moving same right occurences of pivot to the start of array
    if (array[j] == three) {
      two--;
      temp = array[two];
      array[two] = array[j];
      array[j] = temp;
    }
  }

  // Move pivot element to its correct index
  var temp = array[i];
  array[i] = array[right];
  array[right] = temp;

  //moving all left occurrences from end to besides of arr[i]
  j = i - 1;
  for (k = left; k < one; k++, j--) {
    temp = array[k];
    array[k] = array[j];
    array[j] = temp;
  }

  //moving all right occurrences from end to besides of arr[i]
  i = i + 1;
  for (k = right - 1; k > two; k--, i++) {
    temp = array[i];
    array[i] = array[k];
    array[k] = temp;
  }
}

// 3-way partition based quick sort
function quickSort3Way(array, left, right) {
  if (right <= left) return;

  i = 0;
  j = 0;

  quickSort3Waypartition(array, left, right);

  // Recursion
  quickSort3Way(array, left, j);
  quickSort3Way(array, i, right);
  return array;
}

function getExcecutionTime(startTime, endTime, algo, GivenArray) {
  let execTime = 0.1;
  execTime += endTime - startTime;
  results.push({
    algorithm: algo,
    data: GivenArray,
    timeComplexity: execTime,
  });
  setResults();
  charts();
}

function setResults() {
  document.getElementById("inputData").style.visibility = "visible";
  document.getElementById("padding").style.visibility = "visible";
  var content = document.getElementById("result");
  content.innerHTML = "";
  for (var i = 0; i < results.length; i++) {
    content.innerHTML += "<b>" + results[i].algorithm + " :" + "<br>";
    content.innerHTML += "Result" + " = " + results[i].data + "<br>";
    content.innerHTML +=
      "Time complexity" +
      " = " +
      results[i].timeComplexity +
      " milliseconds" +
      "<br>";
  }
}

function charts() {
  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = [];
    var Header = ["Algorithm", "TimeTaken", { role: "style" }];
    data.push(Header);
    for (var i = 0; i < results.length; i++) {
      var temp = [];
      temp.push(results[i].algorithm);
      temp.push(results[i].timeComplexity);
      temp.push(colors[i]);
      data.push(temp);
    }
    var data = new google.visualization.arrayToDataTable(data);

    var options = {
      chart: {
        title: "Algorithms time complexity in msec",
      },
      legend: { position: "none" },
      vAxis: {
        title: "Time Taken",
        titleTextStyle: {
          fontSize: "18",
        },
        viewWindowMode: "explicit",
        viewWindow: {
          min: 0.00000000000000001,
        },
      },
      bars: "vertical",
    };

    var chart = new google.charts.Bar(document.getElementById("chart_div"));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
