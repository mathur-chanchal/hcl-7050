abstract class Bank {
    private double balance;

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    abstract void displayBalance();

}

class SBI extends Bank {
    @Override
    void displayBalance() {
        System.out.println("Bank Balance: " + getBalance());
    }
}

class abstraction {
    public static void main(String[] args) {
        SBI s = new SBI();
        s.setBalance(5000);
        s.displayBalance();
    }

}
