import { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import useAccount from "../../../hooks/account/useAccount";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import Input from "../../../ui/Input";
import useUpdateAccount from "../../../hooks/account/useUpdateAccount";
import { AiFillExclamationCircle } from "react-icons/ai";

// Styled Components
const StyledAccountPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.2rem;
  max-width: 96rem;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const TabContainer = styled.div`
  display: flex;
  gap: 3.2rem;
  border-bottom: 1px solid var(--color-grey-200);
  margin-bottom: 3.2rem;
`;

const TabButton = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) => (props.active ? "var(--color-brand-600)" : "var(--color-grey-500)")};
  background: none;
  border: none;
  border-bottom: ${(props) => (props.active ? "2px solid var(--color-brand-600)" : "none")};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: var(--color-brand-700);
  }
`;

const StyledAccountDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

const Section = styled.section`
  padding: 3.2rem 4rem;
`;

const Infor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  color: var(--color-grey-600);
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-50);
`;

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  gap: 2.4rem;
  padding: 1.2rem 0;
  grid-template-columns: 24rem 1fr 1.2fr;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    padding-top: 2.4rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Error = styled.div`
  font-size: 1.4rem;
  color: var(--color-red-700);
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const StyledIcon = styled.div`
  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-red-700);
  }
`;

const StyledDataItem = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const DataLabel = styled.div`
  font-weight: 500;
  color: var(--color-grey-700);
`;

// Components
function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && (
        <Error>
          <StyledIcon>
            <AiFillExclamationCircle />
          </StyledIcon>
          {error}
        </Error>
      )}
    </StyledFormRow>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function DataItemDes({ label, children }) {
  return (
    <StyledDataItem>
      <DataLabel>{label}</DataLabel>
      <div>{children}</div>
    </StyledDataItem>
  );
}

DataItemDes.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function AccountDataBox({ account, register }) {
  const { userName } = account || {};

  return (
    <StyledAccountDataBox>
      <Section>
        <Infor>
          <DataItemDes label="Tên người dùng">
            <Input type="text" id="userName" value={userName} disabled />
          </DataItemDes>
          <DataItemDes label="Số điện thoại">
            <Input
              type="tel"
              id="phone"
              {...register("phone", {
                pattern: { value: /^\d{10}$/, message: "Số điện thoại phải là 10 chữ số" },
              })}
            />
          </DataItemDes>
          <DataItemDes label="Email">
            <Input
              type="email"
              id="email"
              {...register("email", {
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email không hợp lệ" },
              })}
            />
          </DataItemDes>
        </Infor>
      </Section>
      <Footer>
        <p>Dữ liệu tài khoản được cập nhật tự động.</p>
      </Footer>
    </StyledAccountDataBox>
  );
}

AccountDataBox.propTypes = {
  account: PropTypes.shape({
    userName: PropTypes.string.isRequired,
  }).isRequired,
  register: PropTypes.func.isRequired,
};

function AccountPageCampus({ accountId }) {
  const [activeTab, setActiveTab] = useState("info");
  const { account, loading, error, updateLocalAccount } = useAccount(accountId);
  const { updateAccount, loading: updateLoading } = useUpdateAccount(updateLocalAccount);

  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;

  // Reset form when account changes
  useEffect(() => {
    if (account) {
      reset({
        phone: account.phone || "",
        email: account.email || "",
        oldPassword: "",
        password: "",
      });
    }
  }, [account, reset]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!account) return <p>Không tìm thấy tài khoản.</p>;

  async function onSubmit(data, e) {
    e.preventDefault();
    
    const updatedData = { userName: account.userName };
    if (activeTab === "info") {
      updatedData.phone = data.phone || account.phone;
      updatedData.email = data.email || account.email;
    } else {
      if (data.password) updatedData.password = data.password;
    }

    try {
      const response = await updateAccount(accountId, data.oldPassword, updatedData);

      if (response.success) {
        // Reset form mật khẩu nếu đang ở tab password
        if (activeTab === "password") {
          reset({
            ...getValues(),
            oldPassword: "",
            password: "",
          });
        }
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  }

  const isLoading = loading || updateLoading;

  return (
    <StyledAccountPage>
      <Header>
        <Title>Tài khoản của tôi</Title>
      </Header>

      <TabContainer>
        <TabButton 
          type="button" 
          active={activeTab === "info"} 
          onClick={() => setActiveTab("info")}
          disabled={isLoading}
        >
          Thông tin
        </TabButton>
        <TabButton 
          type="button" 
          active={activeTab === "password"} 
          onClick={() => {
            setActiveTab("password");
            // Reset password fields when switching to password tab
            reset({
              ...getValues(),
              oldPassword: "",
              password: "",
            });
          }}
          disabled={isLoading}
        >
          Mật khẩu
        </TabButton>
      </TabContainer>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {activeTab === "info" && (
          <>
            <AccountDataBox 
              account={account} 
              register={register}
            />
            <FormRow>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang cập nhật..." : "Cập nhật thông tin"}
              </Button>
            </FormRow>
          </>
        )}

        {activeTab === "password" && (
          <StyledAccountDataBox>
            <Section>
              <Infor>
                <DataItemDes label="Mật khẩu cũ">
                  <Input
                    type="password"
                    id="oldPassword"
                    disabled={isLoading}
                    {...register("oldPassword", {
                      required: "Hãy nhập mật khẩu cũ",
                      minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
                    })}
                  />
                  {errors?.oldPassword?.message && (
                    <Error>
                      <StyledIcon>
                        <AiFillExclamationCircle />
                      </StyledIcon>
                      {errors.oldPassword.message}
                    </Error>
                  )}
                </DataItemDes>
                <DataItemDes label="Mật khẩu mới">
                  <Input
                    type="password"
                    id="password"
                    disabled={isLoading}
                    {...register("password", {
                      minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
                    })}
                  />
                  {errors?.password?.message && (
                    <Error>
                      <StyledIcon>
                        <AiFillExclamationCircle />
                      </StyledIcon>
                      {errors.password.message}
                    </Error>
                  )}
                </DataItemDes>
              </Infor>
            </Section>
            <Footer>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
              </Button>
            </Footer>
          </StyledAccountDataBox>
        )}
      </Form>
    </StyledAccountPage>
  );
}

AccountPageCampus.propTypes = {
  accountId: PropTypes.string.isRequired,
};

export default AccountPageCampus; 