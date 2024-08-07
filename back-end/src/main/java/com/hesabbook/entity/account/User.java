package com.hesabbook.entity.account;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String dob;
    private String gender;
    private String role;
    private String email;
    private String password;
    private String mobileNumber;
    private String tempPassword;

    private String primary_user_id;
    private String secondary_user_id;

    private String token;

    private String isLogin;
    private String lastLoginDate;
    private String businessId;
    private String firstTimeLogin;

    public String getPrimaryWithBusiness() {
        return primaryWithBusiness;
    }

    public void setPrimaryWithBusiness(String primaryWithBusiness) {
        this.primaryWithBusiness = primaryWithBusiness;
    }

    private String primaryWithBusiness;
    public String getFirstTimeLogin() {
        return firstTimeLogin;
    }

    public void setFirstTimeLogin(String firstTimeLogin) {
        this.firstTimeLogin = firstTimeLogin;
    }
    public String getIsLogin() {
        return isLogin;
    }

    public String getBusinessId() {
        return businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    public void setIsLogin(String isLogin) {
        this.isLogin = isLogin;
    }

    public String getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(String lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }



    public String getPrimary_user_id() {
        return primary_user_id;
    }

    public void setPrimary_user_id(String primary_user_id) {
        this.primary_user_id = primary_user_id;
    }

    public String getSecondary_user_id() {
        return secondary_user_id;
    }

    public void setSecondary_user_id(String secondary_user_id) {
        this.secondary_user_id = secondary_user_id;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getTempPassword() {
        return tempPassword;
    }
    public void setTempPassword(String tempPassword) {
        this.tempPassword = tempPassword;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getDob() {
        return dob;
    }
    public void setDob(String dob) {
        this.dob = dob;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String toString() {
        return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", dob=" + dob + ", email="
                + email + "]";
    }


}
