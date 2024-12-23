const employeeData = {
    "E12345": {
      name: "John Doe",
      designation: "Software Engineer",
      department: "IT",
      doj: "01-Jan-2020",
      bankName: "ABC Bank",
      accountNo: "1234567890",
      earnings: { basic: 20000, hra: 10000, travel: 5000, medical: 2000, special: 3000 },
    },
  };

  function fetchDetails() {
    const empId = document.getElementById("employee-id").value;
    const employee = employeeData[empId];

    if (employee) {
      document.getElementById("emp-id").innerText = empId;
      document.getElementById("emp-name").innerText = employee.name;
      document.getElementById("designation").innerText = employee.designation;
      document.getElementById("department").innerText = employee.department;
      document.getElementById("doj").innerText = employee.doj;
      document.getElementById("bank-name").innerText = employee.bankName;
      document.getElementById("account-no").innerText = employee.accountNo;

      calculatePaidDays();
    } else {
      alert("Employee ID not found.");
    }
  }

  function calculatePaidDays() {
    const leaves = parseInt(document.getElementById("leaves").value || 0);
    const paidDays = Math.max(30 - leaves, 0);  // Fixed working days are 30

    document.getElementById("paid-days").innerText = paidDays;
    document.getElementById("lop-days").innerText = leaves;

    calculateSalary(paidDays);
  }

  function calculateSalary(paidDays) {
    const employee = employeeData[document.getElementById("employee-id").value];
    if (!employee) return;

    const proratedEarnings = {};
    let grossWages = 0;

    for (const key in employee.earnings) {
      proratedEarnings[key] = (employee.earnings[key] * paidDays) / 30; // Fixed to 30 days
      document.getElementById(key).innerText = proratedEarnings[key].toFixed(2);
      grossWages += proratedEarnings[key];
    }

    document.getElementById("gross-wages").innerText = grossWages.toFixed(2);
    document.getElementById("total-earnings").innerText = grossWages.toFixed(2);

    const totalDeductions = 0;  // Hardcoded deductions
    document.getElementById("total-deductions").innerText = totalDeductions.toFixed(2);

    const netSalary = grossWages - totalDeductions;
    document.getElementById("net-salary").innerText = netSalary.toFixed(2);
  }

  function getCurrentMonth() {
    const date = new Date();
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  document.getElementById("month").innerText = getCurrentMonth();

  document.getElementById("download").addEventListener("click", function () {
    const element = document.querySelector(".container");
    const opt = {
      margin: 0.5,
      filename: "Pay_Slip.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  });