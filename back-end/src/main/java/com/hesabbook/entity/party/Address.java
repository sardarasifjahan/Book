package com.hesabbook.entity.party;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Data
@NoArgsConstructor
@Entity
@Table
@Builder
@Getter
@ToString
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Address implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String address;
    private String city;
    private String state;
    private String zip;
}
