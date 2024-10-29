// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentsAndLending {
    struct Loan {
        uint256 amount;
        uint256 interestRate;
        address borrower;
        bool funded;
        uint256 totalFunded;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;

    mapping(address => int256) public userCredit; // Maps user address to their credit score
    address[] public users;

    uint256 public gasFeePercentage = 2; // Percentage to account for gas fees
    
    address public admin;

    event LoanRequested(uint256 loanId, address indexed borrower, uint256 amount, uint256 interestRate);
    event LoanMatched(uint256 loanId, address indexed lender, uint256 amount, uint256 interestRate);
    event FundsTransferred(uint256 loanId, address indexed borrower, uint256 amount);
    event UserAdded(address indexed user);
    event FundsDistributed(address indexed user, uint256 amountPaid);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not an admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addUser(address user) external onlyAdmin {
        require(userCredit[user] == 0, "User already exists");
        userCredit[user] = 0;
        users.push(user);
        emit UserAdded(user);
    }

    function requestLoan(uint256 amount, uint256 interestRate) external {
        require(amount > 0, "Amount must be greater than 0");
        require(interestRate >= 15 && interestRate <= 25 && (interestRate % 5 == 0), "Invalid interest rate");

        loanCount++;
        loans[loanCount] = Loan(amount, interestRate, msg.sender, false, 0);
        
        userCredit[msg.sender] -= int256(amount) + int256((amount * interestRate) / 100);
        
        emit LoanRequested(loanCount, msg.sender, amount, interestRate);
    }

    function lend(uint256 loanId) external payable {
        Loan storage loan = loans[loanId];
        
        require(!loan.funded, "Loan already funded");
        require(loan.totalFunded < loan.amount, "Loan fully funded");
        
        uint256 amountToLend = msg.value;
        uint256 expectedAmount = loan.amount + (loan.amount * gasFeePercentage) / 100;
        require(amountToLend >= expectedAmount, "Insufficient amount sent");

        payable(loan.borrower).transfer(loan.amount);
        loan.totalFunded += loan.amount;
        if (loan.totalFunded >= loan.amount) {
            loan.funded = true;
        }

        userCredit[msg.sender] += int256(loan.amount) + int256((loan.amount * loan.interestRate) / 100);
        
        emit FundsTransferred(loanId, loan.borrower, loan.amount);
        emit LoanMatched(loanId, msg.sender, loan.amount, loan.interestRate);
    }

   function getActiveLoans() external view returns (Loan[] memory) {
    uint256 activeLoanCount = 0;
    
    // First, count the active loans to determine the size of the array
    for (uint256 i = 1; i <= loanCount; i++) {
        if (!loans[i].funded && loans[i].totalFunded < loans[i].amount) {
            activeLoanCount++;
        }
    }

    // Create an array with the exact size needed for active loans
    Loan[] memory activeLoans = new Loan[](activeLoanCount);
    uint256 index = 0;

    for (uint256 i = 1; i <= loanCount; i++) {
        if (!loans[i].funded && loans[i].totalFunded < loans[i].amount) {
            activeLoans[index] = loans[i];
            index++;
        }
    }

    return activeLoans;
}


    function payUsers() external onlyAdmin {
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            uint256 amountToPay = 10 ether + uint256(userCredit[user]);
            userCredit[user] = 0;
            payable(user).transfer(amountToPay);
            emit FundsDistributed(user, amountToPay);
        }
    }
}
